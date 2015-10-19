angular.module('MainCtrl', []).controller('MainController', function ($scope, About) {

    $scope.title = "MEAN Service Site";

    $scope.title_short = "MEAN";

    $scope.tagline = 'To the moon and back!';

    $scope.site_data = {
        title: "",
        title_short: "",
        owner: "",
        contact_address: "",
        contact_email: "",
        contact_number: "",
        description: "",
        short_descriptions: [],
        social: []
    };

    About.get().then(function (data) {
        $scope.site_data = data.data[0];
        console.log("Site Data: ", $scope.site_data);
    });


});