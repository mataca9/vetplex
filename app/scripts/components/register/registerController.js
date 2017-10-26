(function () {
    'use strict';
    angular.module('app')
        .controller('registerController', ['$scope', '$rootScope', 'toastr', '$timeout', RegisterController]);

        
    function RegisterController($scope, $rootScope, toastr, $timeout) {
        $scope.signIn = signIn;
        $scope.register = register;
        
        // -- private functions
        function signIn(){
            //- busca usuario
            let user = {
                name: 'teste',
                type: 'user',
                id: 1
            };
            
            //- cria sessao
            $rootScope.session = {
                logged: true,
                id: user.id,
                name: user.name,
                type: user.type
                //others
            }
            $rootScope.session = sessionStorage.setItem('vetplex-session', JSON.stringify($rootScope.session));
            $rootScope.go('/home');
        }

        function register(){

        }
    }

})();

