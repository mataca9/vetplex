
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
            .when('/register', {
                templateUrl: _templateBase + '/components/register/register.html' ,
                controller: 'registerController',
                controllerAs: '_ctrl'
            })
            .when('/schedule', {
                templateUrl: _templateBase + '/components/schedule/schedule.html' ,
                controller: 'scheduleController',
                controllerAs: '_ctrl'
            })
            .when('/page', {
                templateUrl: _templateBase + '/components/page/page.html' ,
                controller: 'pageController',
                controllerAs: '_ctrl'
            })
        $routeProvider.otherwise({ redirectTo: '/' });
    };

})();