angular.module('CategoryCtrl', []).controller('CategoryController', function($scope, Category) {

	$scope.tagline = 'These are the categories!';

	Category.get().then(function(data) {
		$scope.categories = data.data;
		console.log("Categories: ", $scope.categories);
	});


});