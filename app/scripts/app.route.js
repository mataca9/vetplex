
(function () {
    'use strict';

    var _templateBase = './app/scripts';

    angular.module('app')
    .config(['$routeProvider', '$locationProvider', route]);
    
    function route($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider   
            .when('/', {
                templateUrl: _templateBase + '/components/home/home.html' ,
                controller: 'homeController',
                controllerAs: '_ctrl'
            })
            .when('/about', {
                templateUrl: _templateBase + '/components/about/about.html' ,
                controller: 'aboutController',
                controllerAs: '_ctrl'
            })
        $routeProvider.otherwise({ redirectTo: '/' });
    };

})();