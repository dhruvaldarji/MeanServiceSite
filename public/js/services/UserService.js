angular.module('UserService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/users');
        },

        // call to POST and create a new user
        create : function(nerdData) {
            return $http.post('/api/users', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }
    }

}]);