angular.module('AppointmentCtrl', []).controller('AppointmentController', function($scope, $routeParams, Appointment, Service, Category) {

    $scope.tagline = 'These are the appointments!';

    $scope.appointments = {};
    $scope.Cart = {};


    var LoadCart = function(cart){
        for(var item in cart){
            Service.read(cart[item])
                .then(function successCallback(response) {
                    Category.read(response.data.category)
                        .then( function successCallback(res){
                            response.data.category = res.data.name;
                        }, function errorCallback(res){
                            response.data.category = "OTHER";
                        });

                    if(typeof $scope.Cart !== 'undefined' && $scope.Cart.length > 0){
                        $scope.Cart.push(response.data);
                    }
                    else{
                        $scope.Cart = [response.data];
                    }

                }, function errorCallback(response) {

                }
            );
        }
    };

    //Importing Appointments from DB
    if($routeParams.apptID){
        id = $routeParams.apptID;
        Appointment.read(id).then(function(data) {
            $scope.appointments = data.data;
            $scope.Cart = $scope.appointments;
        });
    }
    //No appointments, importing from cart.
    else {
        $scope.Cart = LoadCart(Appointment.localCart());
    }


    $scope.EmptyCart = function(){
        //Present Confirmation Dialog to empty cart
        var result = false;
        result = window.confirm("Are you sure you want to empty your cart?");
        if(result){
            $scope.Cart = Appointment.emptyCart();
        }
        else {
            //do nothing
        }
    };

    var submitAppointment = function (appointment) {
        Service.create(appointment)
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.results = "Success";
                $scope.response = response;
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.results = "Failure";
                $scope.response = response;
            });
        //console.log("Results: ", $scope.results);
        setTimeout(function(){}, 1000);
    };

    $scope.submitAllAppointments = function (){
        for(var appt in $scope.Cart){
            console.log("dicks: ");
        }

    }

    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : 0;
    };
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function ($event) {
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

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

    $scope.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };

});