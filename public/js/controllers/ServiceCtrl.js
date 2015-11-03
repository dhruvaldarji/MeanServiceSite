angular.module('ServiceCtrl', []).controller('ServiceController', function ($scope, Service, $uibModal, $log) {

    $scope.tagline = 'These are the Services!';

    Service.get().then(function(data) {
        $scope.services = data.data;
        console.log("Services: ", $scope.services);
    });

    $scope.Cart = [];

    $scope.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function() {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.AddToCart = function(serviceID){
        if ($scope.Cart == null){
            $scope.Cart = [serviceID];
        }
        else{
            $scope.Cart.push(serviceID);
        }
    };

    $scope.openNewServiceModal = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'createServiceModal.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (newService) {
            $scope.newService = newService;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('ServiceCtrl').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, Service) {

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

        console.log("Results: ", $scope.results);

        $scope.stage = 2; // Show results

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});