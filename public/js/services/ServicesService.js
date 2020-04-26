angular.module('ServicesService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/services');
        },

        // call to POST and create a new user
        create : function(nerdData) {
            return $http.post('/api/services', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/services/' + id);
        }
    }

}]);