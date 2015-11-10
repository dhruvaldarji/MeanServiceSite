angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UserController'
        })
        .when('/services', {
            templateUrl: 'views/services.html',
            controller: 'ServiceController'
        })
        .when('/appointments/', {
            templateUrl: 'views/appointment.html',
            controller: 'AppointmentController'
        })
        .when('/appointments/:apptID', {
            templateUrl: 'views/appointment.html',
            controller: 'AppointmentController',
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);

}]);