angular.module('CategoryService', []).factory('Category', ['$http', function($http) {

    return {
        // call to get all Categories
        get : function() {
            return $http.get('/api/categories');
        },

        // call to POST and create a new Category
        create : function(category) {
            return $http.post('/api/categories', category);
        },
        // call to UPDATE a Category
        update : function(id, category) {
            return $http.put('/api/categories/:' + id, category);
        },

        // call to DELETE a Category
        delete : function(id) {
            return $http.delete('/api/categories/:' + id);
        }
    }

}]);