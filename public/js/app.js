angular.module('app',
    ['ui.bootstrap',
        'ngRoute',
        'appRoutes',
        'MainCtrl',
        'UserCtrl',
        'UserService',
        'ServiceCtrl',
        'ServicesService',
        'CategoryCtrl',
        'CategoryService',
        'AppointmentCtrl',
        'AppointmentService',
        'AboutCtrl',
        'AboutService',
        'ng-mfb'
    ]);

//Non-Angular JS
$(function(){

    //Close Navbar dropdown on option select
    $('.nav a').on('click', function () {
        $('.btn-navbar').click(); //bootstrap 2.x
        $('.navbar-toggle').click(); //bootstrap 3.x by Richard
    });

});
