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

});