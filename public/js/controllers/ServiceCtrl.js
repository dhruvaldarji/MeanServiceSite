angular.module('ServiceCtrl', []).controller('ServiceController', function ($scope, Service, $uibModal, $log) {

    $scope.tagline = 'These are the Services!';

    $scope.services = [];

    $scope.getServices = function () {
        Service.get()
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.results = "Success";
                $scope.response = response;
                $scope.services = response.data;

                console.log("Services: ", $scope.services);
                //console.log("Results: ", $scope.results);

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.results = "Failure";
                $scope.response = response;
                $scope.services = [];
            });
    };

    $scope.getServices();

    $scope.Cart = [];

    $scope.alerts = [
        {type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'},
        {type: 'success', msg: 'Well done! You successfully read this important alert message.'}
    ];

    $scope.addAlert = function () {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.AddToCart = function (serviceID) {
        if ($scope.Cart == null) {
            $scope.Cart = [serviceID];
        }
        else {
            $scope.Cart.push(serviceID);
        }
    };

    $scope.openNewServiceModal = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'createServiceModal.html',
            controller: 'CreateServiceCtrl',
            resolve: {
                newService: function () {
                    return $scope.newService;
                }
            }
        });

        modalInstance.result.then(function (newService) {
            $scope.newService = newService;
        }, function () {
            //$log.info('Create Modal dismissed at: ' + new Date());
            $scope.getServices();
        });
    };

    $scope.openDisplayServiceModal = function (id) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'displayServiceModal.html',
            controller: 'DisplayServiceCtrl',
            resolve: {
                currentServiceID: function () {
                    return id + '';
                }
            }
        });

        modalInstance.result.then(function (currentService) {
            $scope.currentService = currentService;
        }, function () {
            //$log.info('Display Modal dismissed at: ' + new Date());
        });
    };

    $scope.openEditServiceModal = function (id) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'editServiceModal.html',
            controller: 'EditServiceCtrl',
            resolve: {
                editServiceID: function () {
                    return id;
                },
                editService: function(){
                    return $scope.editService;
                }
            }
        });

        modalInstance.result.then(function (editService) {
            $scope.editService = editService;
        }, function () {
            //$log.info('Edit Modal dismissed at: ' + new Date());
            $scope.getServices();
        });
    };

    $scope.openDeleteServiceModal = function (id) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'deleteServiceModal.html',
            controller: 'DeleteServiceCtrl',
            resolve: {
                deleteServiceID: function () {
                    return id;
                },
                deleteService: function(){
                    return $scope.deleteService;
                }
            }
        });

        modalInstance.result.then(function (deleteService) {
            $scope.deleteService = deleteService;
        }, function () {
            //$log.info('Delete Modal dismissed at: ' + new Date());
            $scope.getServices();
        });
    };

});

angular.module('ServiceCtrl').controller('CreateServiceCtrl', function ($scope, $uibModalInstance, Service) {

    $scope.newService = {
        name: null,
        category: null,
        price: null,
        description: null,
        duration: null
    };

    $scope.stage = 0; // Entering information

    $scope.submitService = function () {
        $scope.stage = 1; // Processing

        Service.create($scope.newService)
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

        $scope.stage = 2; // Show results
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('ServiceCtrl').controller('DisplayServiceCtrl', function ($scope, $uibModalInstance, Service, currentServiceID) {

    $scope.stage = 1; // Processing

    Service.read(currentServiceID)
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.results = "Success";
            $scope.response = response;
            $scope.currentService = response.data;
            $scope.stage = 2; // Display Results
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.results = "Failure";
            $scope.response = response;
            $scope.currentService = {
                name: null,
                category: null,
                price: null,
                description: null,
                duration: null
            };

            $scope.stage = 2; // Display Results

        });


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('ServiceCtrl').controller('EditServiceCtrl', function ($scope, $uibModalInstance, Service, editServiceID) {

    $scope.stage = 1; // Entering information

    Service.read(editServiceID)
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.results = "Success";
            $scope.response = response;
            $scope.editService = response.data;
            $scope.stage = 0; // Display Results
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.results = "Failure";
            $scope.response = response;
            $scope.editService = {
                name: null,
                category: null,
                price: null,
                description: null,
                duration: null
            };

            $scope.stage = 0; // Display Results

        });

    $scope.submitEditService = function () {
        $scope.stage = 1; // Processing

        Service.update($scope.editService._id.toString(), $scope.editService)
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

        $scope.stage = 2; // Show results
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('ServiceCtrl').controller('DeleteServiceCtrl', function ($scope, $uibModalInstance, Service, deleteServiceID) {

    $scope.stage = 1; // Getting Data

    Service.read(deleteServiceID)
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.results = "Success";
            $scope.response = response;
            $scope.deleteService = response.data;
            $scope.stage = 0; // Display Results
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.results = "Failure";
            $scope.response = response;
            $scope.deleteService = {
                name: null,
                category: null,
                price: null,
                description: null,
                duration: null
            };

            $scope.stage = 0; // Display Results

        });

    $scope.deleteSubmitService = function () {
        $scope.stage = 1; // Processing

        Service.delete($scope.deleteService._id.toString())
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.results = "Success";
                $scope.response = response;
                //console.log("Results: ", $scope.results);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.results = "Failure";
                $scope.response = response;
                //console.log("Results: ", $scope.results);
            });
        //console.log("Results: ", $scope.results);

        $scope.stage = 2; // Show results
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});