var mod=angular.module('areahopConfig', []);


mod.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.otherwise({redirectTo: '/home'});
    
    $routeProvider.when('/auto', {
        templateUrl: '/typehead.html',
		controller: 'HomeController'
    });
    $routeProvider.when('/addbusiness', {
        templateUrl: '/addNewBusinesses.html',
		controller: 'mainController'
    });
    $routeProvider.when('/aboutus', {
        templateUrl: '/aboutus.html',
		controller: 'mainController'
    });
    $routeProvider.when('/writereview', {
        templateUrl: '/views/newuser.html',
		controller: 'mainController'
    });
    $routeProvider.when('/home', {
        templateUrl: '/home.html',
		controller: 'mainController'
    });


    
    
	 //$locationProvider.html5Mode(true);
}]);