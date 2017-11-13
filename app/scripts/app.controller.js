
(function () {
    'use strict';

    angular.module('app')
    .controller('mainController', ['$scope', '$rootScope', '$routeParams', '$location', '$timeout', '$interval', 'toastr', 'userService', MainController]);

    function MainController($scope, $rootScope, $routeParams, $location, $timeout, $interval, toastr){

        //-- Public
        $rootScope.go = go;
        $rootScope.logout = logout;
        $rootScope.session;
        $rootScope.activeMenu = 'home';
        
        // -- Methods
        (function init(){
            if(sessionStorage.getItem('vetplex-session')){
                $rootScope.session = JSON.parse(sessionStorage.getItem('vetplex-session'));
            } else {
                $rootScope.session = {
                    logged: false
                }

                sessionStorage.setItem('vetplex-session', JSON.stringify($rootScope.session));
            }
        })();

        function logout () {
            $rootScope.session = {
                logged: false
            }
            sessionStorage.removeItem('vetplex-session');
            go('/home');
        }

        function go ( path ) {
            $rootScope.activeMenu = path.split('/').pop();
            $location.path( path );
        };
    }

})();