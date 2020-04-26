angular.module('UserCtrl', []).controller('UserController', function($scope) {

	$scope.title = "MEAN Service Site";

	$scope.tagline = 'This is the Users Page!';

	$scope.Cart = [];

	$scope.services = [
		{
			"id": '0',
			"name" : 'Service_Name',
			"category" : 'Service_Category',
			"price": 10.00,
			"description": 'Service_Description',
			"time": 1.00
		},
		{
			"id": '1',
			"name" : 'Service_1',
			"category" : 'Service_Category',
			"price": 10.00,
			"description": 'Service_Description',
			"time": 1.00
		},
		{
			"id": '2',
			"name" : 'Service_2',
			"category" : 'Service_Category',
			"price": 10.00,
			"description": 'Service_Description',
			"time": 1.00
		},
		{
			"id": '3',
			"name" : 'Service_3',
			"category" : 'Service_Category',
			"price": 10.00,
			"description": 'Service_Description',
			"time": 1.00
		}
	];

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