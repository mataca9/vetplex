
(function () {
    'use strict';

    angular.module('app')
    .controller('mainController', ['$scope', '$rootScope', '$routeParams', '$location', '$timeout', '$interval', 'toastr', MainController]);

    function MainController($scope, $rootScope, $routeParams, $location, $timeout, $interval, toastr){
        $rootScope.go = go;
        $rootScope.logout = logout;
        $rootScope.session;
        
        // -- private functions
        (function init(){
            if(sessionStorage.getItem('vetplex-session')){
                $rootScope.session = JSON.parse(sessionStorage.getItem('vetplex-session'));
            } else {
                $rootScope.session = {
                    logged: false
                }

                $rootScope.session = JSON.stringify(sessionStorage.setItem('vetplex-session', $rootScope.session));
            }
        })();

        function logout () {
            $rootScope.session = {
                logged: false
            }
            sessionStorage.removeItem('vetplex-session');
        }

        function go ( path ) {
            $location.path( path );
        };
    }

})();