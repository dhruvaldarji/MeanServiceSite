angular.module('MainCtrl', []).controller('MainController', function ($scope, About, $location, $sessionStorage) {

    $scope.site_data = {};

    $scope.$storage = $sessionStorage.$default({
        admin: false
    });

    $scope.admin = $scope.$storage.admin;

    $scope.auth = function(){
        $scope.$storage.admin = !$scope.$storage.admin;
        $scope.admin = $scope.$storage.admin;
    };

    About.get().then(function (data) {
        $scope.site_data = data.data[0];
        //console.log("Site Data: ", $scope.site_data);
    });

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.carouselInterval = 3000;

    $scope.twitterButtons = function(){
        !function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = p + '://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, 'script', 'twitter-wjs');
    }

});