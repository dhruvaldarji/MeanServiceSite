angular.module('AppointmentService', []).factory('Appointment', ['$http', function($http) {

    var cart = [];

    return {
        // call to get all Categories
        get : function() {
            return $http.get('/api/appointments');
        },

        // call to get Service by id.
        read : function(id) {
            return $http.get('/api/appointments/' + id);
        },

        // call to POST and create a new Appointment
        create : function(appointment) {
            return $http.post('/api/appointments', appointment);
        },
        // call to UPDATE a Appointment
        update : function(id, appointment) {
            return $http.put('/api/appointments/:' + id, appointment);
        },

        // call to DELETE a Appointment
        delete : function(id) {
            return $http.delete('/api/appointments/:' + id);
        },

        //call to get instance of cart.
        localCart : function(){
            return cart;
        },

        //call to empty cart
        emptyCart : function(){
            cart = [];
            return cart;
        }
    }

}]);