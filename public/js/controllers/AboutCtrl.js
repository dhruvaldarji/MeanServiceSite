angular.module('AboutCtrl', []).controller('AboutController', function($scope, About) {

    About.get().then(function (data) {
        $scope.site_data = data.data[0];
        //console.log("Site Data: ", $scope.site_data);
    });
});