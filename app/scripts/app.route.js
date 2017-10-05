
(function () {
    'use strict';

    var _templateBase = './scripts';

    angular.module('app')
    .config(['$routeProvider', route]);
    
    function route($routeProvider) {
        $routeProvider   
            .when('/', {
                templateUrl: _templateBase + '/components/home/home.html' ,
                controller: 'homeController',
                controllerAs: '_ctrl'
            })
        $routeProvider.otherwise({ redirectTo: '/' });
    };

})();