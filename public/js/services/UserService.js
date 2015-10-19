angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // call to get all Users
        get : function() {
            return $http.get('/api/users');
        },

        // call to POST and create a new User
        create : function(user) {
            return $http.post('/api/users', user);
        },
        // call to UPDATE a User
        update : function(id, user) {
            return $http.put('/api/users/:' + id, user);
        },

        // call to DELETE a User
        delete : function(id) {
            return $http.delete('/api/users/:' + id);
        }
    }

}]);