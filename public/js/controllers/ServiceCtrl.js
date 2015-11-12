angular.module('ServiceCtrl', []).controller('ServiceController', function ($scope, Service, Category, Appointment, $uibModal, $log) {

    $scope.tagline = 'These are the Services!';

    $scope.services = [];

    $scope.Cart = Appointment.localCart();

    $scope.getCategories = function () {
        Category.get()
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.results = "Success";
                $scope.response = response;
                $scope.categories = response.data;

                //console.log("Results: ", $scope.results);

                angular.forEach($scope.categories, function (category) {
                    //console.log("Category: ", category);
                    Service.getByCategory(category._id)
                        .then(function successCallback(response) {
                            // this callback will be called asynchronously
                            // when the response is available
                            $scope.results = "Success";
                            $scope.response = response;

                            category.services = response.data;
                            //console.log(category);
                            //console.log("Results: ", $scope.results);

                        }, function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            $scope.results = "Failure";
                            $scope.response = response;
                            $scope.categories[index].services = [];
                        });
                });


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.results = "Failure";
                $scope.response = response;
                $scope.categories = [];
            });
    };

    $scope.getCategories();

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

    $scope.AddToCart = function (serviceID) {
        //If service is not already in the Cart, then add.
        //console.log("Cart Before: ", $scope.Cart);
        //console.log("Index of val=serviceID: "+serviceID+" = ", $scope.Cart.indexOf(serviceID));

        if($scope.Cart.indexOf(serviceID) < 0){
            $scope.Cart.push(serviceID);
        }
        else {
            window.alert("This item is already in the cart.")
        }
        //console.log("Cart After: ", $scope.Cart);
    };

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
            $scope.getCategories();
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
                editService: function () {
                    return $scope.editService;
                }
            }
        });

        modalInstance.result.then(function (editService) {
            $scope.editService = editService;
        }, function () {
            //$log.info('Edit Modal dismissed at: ' + new Date());
            $scope.getCategories();
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
                deleteService: function () {
                    return $scope.deleteService;
                }
            }
        });

        modalInstance.result.then(function (deleteService) {
            $scope.deleteService = deleteService;
        }, function () {
            //$log.info('Delete Modal dismissed at: ' + new Date());
            $scope.getCategories();
        });
    };

});

angular.module('ServiceCtrl').controller('CreateServiceCtrl', function ($scope, $uibModalInstance, $timeout, Category, Service) {

    $scope.newService = {
        name: null,
        category: null,
        price: null,
        description: null,
        duration: null
    };

    Category.get()
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.results = "Success";
            $scope.type = "success";
            $scope.response = response;
            $scope.categories = response.data;
            $scope.newService.category = $scope.categories[0];

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.results = "Failure";
            $scope.type = "warning";
            $scope.response = response;
            $scope.newCats = [];
        });

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

        setTimeout(function(){
            $scope.stage = 2; // Show results
        }, 1000);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('ServiceCtrl').controller('DisplayServiceCtrl', function ($scope, $uibModalInstance, $timeout, Service, Category, currentServiceID) {

    $scope.stage = 1; // Processing

    Service.read(currentServiceID)
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.response = response;
            $scope.currentService = response.data;

            Category.read($scope.currentService.category)
                .then(function successCallback(res){
                    $scope.currentService.category = res.data.name;
                    $scope.results = "Success";
                    $scope.type = "success";
                }, function errorCallback(res){
                    $scope.currentService.category = "Other";
                });

            $timeout(function(){
                $scope.stage = 2; // Show results
            }, 1000);

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.results = "Failure";
            $scope.type = "warning";
            $scope.response = response;
            $scope.currentService = {
                name: null,
                category: null,
                price: null,
                description: null,
                duration: null
            };

            $timeout(function(){
                $scope.stage = 2; // Show results
            }, 1000);

        });


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('ServiceCtrl').controller('EditServiceCtrl', function ($scope, $uibModalInstance, $timeout, Service, Category, editServiceID) {

    $scope.stage = 1; // Entering information

    Service.read(editServiceID)
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.editService = response.data;

            $scope.results = "Success";
            $scope.response = response;
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

    var findCategory = function (list, id) {
        for (var cat in list) {
            if (list[cat]._id = id) {
                return cat;
            }
        }
    };

    Category.get()
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.response = response;
            $scope.categories = response.data;
            var temp = $scope.editService.category;
            var index = findCategory($scope.categories, temp);
            $scope.editService.category = $scope.categories[index];
            $scope.results = "Success";

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.results = "Failure";
            $scope.response = response;
            $scope.newCats = [];
        });

    $scope.submitEditService = function () {
        $scope.stage = 1; // Processing

        Service.update($scope.editService._id.toString(), $scope.editService)
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

        $timeout(function(){
            $scope.stage = 2; // Show results
        }, 1000);

        //console.log("Results: ", $scope.results);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('ServiceCtrl').controller('DeleteServiceCtrl', function ($scope, $uibModalInstance, $timeout, Service, Category, deleteServiceID) {

    $scope.stage = 1; // Getting Data

    Service.read(deleteServiceID)
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.response = response;
            $scope.deleteService = response.data;

            Category.read($scope.deleteService.category)
                .then(function successCallback(res){
                    $scope.deleteService.category = res.data.name;
                    $scope.results = "Success";
                }, function errorCallback(res){
                    $scope.deleteService.category = "Other";
                });

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
                $scope.type = "success";
                $scope.response = response;
                //console.log("Results: ", $scope.results);

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.results = "Failure";
                $scope.type = "warning";
                $scope.response = response;
                //console.log("Results: ", $scope.results);
                $scope.stage = 2; // Show results

            });

        $timeout(function(){
            $scope.stage = 2; // Show results
        }, 1000);

        //console.log("Results: ", $scope.results);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});