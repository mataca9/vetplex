
(function () {
    'use strict';

    angular.module('app')
    .controller('mainController', ['$scope', '$rootScope', '$location', '$timeout', '$interval', 'toastr', '$state', MainController]);

    function MainController($scope, $rootScope, $location, $timeout, $interval, toastr, $state){

        //-- Public
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
            $state.go('home');
        }
    }

})();