
(function () {
    'use strict';

    var _templateBase = './scripts';

    angular.module('app')
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', route]);

    function route( $locationProvider, $stateProvider, $urlRouterProvider) {

        //$locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');        
        $stateProvider

        .state('home', {
            url: '/',
            templateUrl: _templateBase + '/components/home/home.html' ,
            controller: 'homeController',
            controllerAs: '_ctrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: _templateBase + '/components/about/about.html' ,
            controller: 'aboutController',
            controllerAs: '_ctrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: _templateBase + '/components/register/register.html' ,
            controller: 'registerController',
            controllerAs: '_ctrl'
        })
        .state('schedule', {
            url: '/schedule',
            templateUrl: _templateBase + '/components/schedule/schedule.html' ,
            controller: 'scheduleController',
            controllerAs: '_ctrl'
        })
        .state('page', {
            url: '/page/:id',
            params: {
                id: null
            },
            templateUrl: _templateBase + '/components/page/page.html' ,
            controller: 'pageController',
            controllerAs: '_ctrl'
        })
        .state('config', {
            url: '/config',
            templateUrl: _templateBase + '/components/config/config.html' ,
            controller: 'configController',
            controllerAs: '_ctrl'
        })
    };

})();