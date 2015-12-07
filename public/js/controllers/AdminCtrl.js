angular.module('AdminCtrl', []).controller('AdminCtrl', function ($scope, Appointment, Category, Service) {

    $scope.tagline = 'Admin Menu';

    $scope.getAppointments = function () {
        Appointment.get()
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.results = "Success";
                $scope.response = response;
                $scope.appointments = response.data;


                angular.forEach($scope.appointments, function (appointment) {

                    Service.read(appointment.serviceID)
                        .then(function successCallback(response) {
                            appointment.service = response.data;
                            Category.read(appointment.service.category)
                                .then(function successCallback(response) {
                                    appointment.category = response.data;
                                }, function errorCallback(response) {

                                });

                        }, function errorCallback(response) {

                        });
                });

                console.log($scope.appointments);


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.results = "Failure";
                $scope.response = response;
                $scope.appointments = [];
            });
    };
    $scope.getAppointments();

    $scope.deleteAppointment = function (index) {
        //Present Confirmation Dialog to empty cart
        var result = window.confirm("Are you sure you want to delete appointment [ " + $scope.appointments[index].category.name +':'+$scope.appointments[index].service.name + " ]?");
        if (result) {
            Appointment.delete($scope.appointments[index]._id)
                .then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.results = "Success";
                    $scope.response = response;
                    $scope.getAppointments();

                    console.log("Delete Appointment Success!: ", response);

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.results = "Failure";
                    $scope.response = response;

                    console.log("Delete Appointment Fail!: ", response);

                });
        }
        else {
            //do nothing
        }
    };

});