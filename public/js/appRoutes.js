angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})
		.when('/users', {
			templateUrl: 'views/users.html',
			controller: 'UserController'
		})
		.when('/services', {
			templateUrl: 'views/services.html',
			controller: 'ServiceController'
		})
		.otherwise({redirectTo : '/'});

	$locationProvider.html5Mode(true);

}]);