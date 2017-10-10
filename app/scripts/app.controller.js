
(function () {
    'use strict';

    angular.module('app')
    .controller('mainController', ['$scope', '$rootScope', '$routeParams', '$location', '$timeout', '$interval', 'toastr', MainController]);

    function MainController($scope, $rootScope, $routeParams, $location, $timeout, $interval, toastr){
        $rootScope.go = go;

        // private functions
        function go ( path ) {
            $location.path( path );
        };
    }

})();