(function () {
    'use strict';
    angular.module('app')
        .controller('registerController', ['$scope', '$rootScope', 'toastr', '$timeout', 'userService', '$state', RegisterController]);

        
    function RegisterController($scope, $rootScope, toastr, $timeout, userService, $state) {

        //-- Public
        $scope.signIn = signIn;
        $scope.signUp = signUp;
        $scope.login = { username:'', password:'' };
        $scope.register = {
            name:'',
            email:'',
            password:'',
            doc:'',
            type: 0
        };
        
        //-- Methods
        function signIn(email, password){
            userService.getUserLogin(email, password).then(function(user){
                if(user){
                    createSession(user);
                    toastr.success('Bem vindo ' + user.name);
                    $state.go('home');
                }
            }, function(error){
                toastr.error(error);
            });
        }

        function createSession(user){
            $rootScope.session = {
                logged: true,
                id: user.id,
                name: user.name,
                type: user.type
            }
            sessionStorage.setItem('vetplex-session', JSON.stringify($rootScope.session));
        }

        function signUp(){
            userService.getUserByEmail($scope.register.email).then(function(snapshot){
                let user = snapshot.val();
                if (user){
                    toastr.error("O email selecionado já está em uso");
                } else {
                    userService.createUser($scope.register).then(function(){
                        signIn($scope.register.email, $scope.register.password);
                    });
                }
            });
        }
    }

})();

