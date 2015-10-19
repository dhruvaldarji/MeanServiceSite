angular.module('UserCtrl', []).controller('UserController', function($scope, User) {

	$scope.tagline = 'This is the Users Page!';

	User.get().then(function(data) {
		$scope.users = data.data;
		console.log("Users: ", $scope.users);
	});

});