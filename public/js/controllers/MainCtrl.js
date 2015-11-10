angular.module('MainCtrl', []).controller('MainController', function ($scope, About, Appointment) {

    $scope.site_data = {};

    About.get().then(function (data) {
        $scope.site_data = data.data[0];
        //console.log("Site Data: ", $scope.site_data);
    });


});