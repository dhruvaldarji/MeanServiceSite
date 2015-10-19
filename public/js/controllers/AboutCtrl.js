angular.module('AboutCtrl', []).controller('AboutController', function($scope, About) {

    $scope.tagline = 'This is information about the site!';

    About.get().then(function(data) {
        $scope.site_data = data.data;
        console.log("Site Data: ", $scope.site_data);
    });

});