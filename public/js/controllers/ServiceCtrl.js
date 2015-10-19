angular.module('ServiceCtrl', []).controller('ServiceController', function ($scope, Service) {

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
    }
});