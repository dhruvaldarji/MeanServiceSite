angular.module('AppointmentCtrl', []).controller('AppointmentController', function ($scope, $routeParams, $uibModal, $sessionStorage,
                                                                                    Appointment, Service, Category) {

    $scope.tagline = 'These are the appointments!';

    $scope.appointments = [];

    $scope.$storage = $sessionStorage.$default({
        Cart: []
    });

    var LoadFromCart = function () {
        $scope.appointments = [];
        var cart = $scope.$storage.Cart;
        for (var item in cart) {
            Service.read(cart[item])
                .then(function successCallback(response) {
                    Category.read(response.data.category)
                        .then(function successCallback(res) {
                            response.data.category = res.data.name;
                        }, function errorCallback(res) {
                            response.data.category = "OTHER";
                        });

                    if (typeof $scope.appointments !== 'undefined' && $scope.appointments.length > 0) {
                        $scope.appointments.push(response.data);
                    }
                    else {
                        $scope.appointments = [response.data];
                    }

                }, function errorCallback(response) {

                }
            );
        }
    };
    LoadFromCart();

    $scope.EmptyCart = function () {
        //Present Confirmation Dialog to empty cart
        var result = window.confirm("Are you sure you want to empty your cart?");
        if (result) {
            delete $scope.$storage.Cart;
            LoadFromCart();
        }
        else {
            //do nothing
        }
    };

    $scope.openSchedulerModal = function (index) {
        var service = $scope.appointments[index];
        $scope.newAppointment = {
            'serviceID': service._id,
            'service': service.name,
            'client': "",
            'date': new Date(),
            'comments': ""
        };

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'scheduleAppointment.html',
            controller: 'ScheduleAppointmentCtrl',
            resolve: {
                newAppointment: function () {
                    return $scope.newAppointment;
                }
            }
        });

        modalInstance.result.then(function (newAppointment) {
            $scope.newAppointment = newAppointment;
        }, function () {
            //$log.info('Create Modal dismissed at: ' + new Date());
            if ($scope.results = "Success") {
                $scope.appointments.splice(index, 1);
                $scope.$storage.Cart.splice(index, 1);
            }
            $scope.results = "";
        });
    };

    $scope.deleteAppointment = function (index) {
        //Present Confirmation Dialog to empty cart
        var result = window.confirm("Are you sure you want to delete appointment [ " + $scope.appointments[index].name + " ]?");
        if (result) {
            $scope.appointments.splice(index, 1);
            $scope.$storage.Cart.splice(index, 1);
        }
        else {
            //do nothing
        }
    };

});

angular.module('AppointmentCtrl').controller('ScheduleAppointmentCtrl', function ($scope, $uibModalInstance, $timeout, Appointment, newAppointment) {

    console.log("Modal open");

    $scope.stage = 0; // Entering information

    $scope.newAppointment = newAppointment;

    $scope.submitAppointment = function () {
        $scope.stage = 1; // Processing
        //console.log("Creating Appointment: ",$scope.newAppointment);
        Appointment.create($scope.newAppointment)
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.results = "Success";
                $scope.type = "success";
                $scope.response = response;


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.results = "Failure";
                $scope.type = "warning";
                $scope.response = response;
            });

        $timeout(function () {
            if ($scope.results === "Success") {
                $scope.stage = 2;
            }
            else {
                $scope.stage = 0;
            }
        }, 1000);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /**---------- Date Picker Functions ---------**/

    $scope.today = function () {
        $scope.newAppointment.Date = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.newAppointment.Date = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.maxDate = new Date();
    $scope.maxDate.setDate($scope.maxDate.getDate()+30);

    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.status = {
        opened: false
    };


    /**----------End Date Picker Function---------**/
});
