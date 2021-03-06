angular.module('ServicesService', []).factory('Service', ['$http', function($http) {

    return {
        // call to get all Services
        get : function() {
            return $http.get('/api/services');
        },

        // call to get all Services by category
        getByCategory : function(id) {
            return $http.get('/api/services/category/'+id);
        },

        // call to get Service by id.
        read : function(id) {
            return $http.get('/api/services/' + id);
        },

        // call to POST and create a new Service
        create : function(service) {
            return $http.post('/api/services', service);
        },
        // call to UPDATE a Service
        update : function(id, service) {
            return $http.put('/api/services/' + id, service);
        },

        // call to DELETE a Service
        delete : function(id) {
            return $http.delete('/api/services/' + id);
        }
    }

}]);