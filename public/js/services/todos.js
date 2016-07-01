var mod=angular.module('areahopService', []);

	// super simple service
	// each function returns a promise object 
	mod.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
 
				return $http.post('api/todos/', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			search1 : function(id) {
				return $http.post('/api/todos/searchone/' +id);
			},
			search : function(todoData) {
				return $http.post('/api/todos/search', todoData);
			},
			addBusiness: function(Data) {

				return $http.post('api/todos/addBusiness', Data);
			},
			validateTag: function(Data) {

				return $http.post('api/todos/validateTag', Data);
			},

		}
	}]);

	mod.factory('Business', ['$http',function($http) {
		return {
			
			search1 : function(id) {
				return $http.post('/api/business/searchone/' +id);
			}
			
		}
	}]); 
	mod.factory('ShopArr',['$http', function ($http) {
		
		return { 

    
			
			query : function() {

				return $http.get('/api/todos/findAllTag').then(function(resp) {
        return resp.data;
			});
			}
			
		
	};
		
  }]);
	mod.factory('dataFactory', function($http) {
  return {
    get: function(url) {
      return $http.get(url).then(function(resp) {
        return resp.data; // success callback returns this
      });
    }
  };
});