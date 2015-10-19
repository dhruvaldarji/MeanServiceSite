angular.module('AboutService', []).factory('About', ['$http', function($http) {

    return {
        // call to get all Data
        get : function() {
            return $http.get('/api/data');
        },

        // call to POST and create a new Data
        create : function(site_data) {
            return $http.post('/api/data', site_data);
        },
        // call to UPDATE a Category
        update : function(id, site_data) {
            return $http.put('/api/data/:' + id, site_data);
        },

        // call to DELETE a Category
        delete : function(id) {
            return $http.delete('/api/data/:' + id);
        }
    }

}]);