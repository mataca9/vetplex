(function () {
    'use strict';
    angular.module('app')
        .controller('registerController', ['$scope', '$rootScope', 'toastr', '$timeout', RegisterController]);

        
    function RegisterController($scope, $rootScope, toastr, $timeout) {
        $scope.signIn = signIn;
        $scope.signUp = signUp;
        $scope.login = { username:'', password:'' };
        $scope.register = {
            name:'',
            email:'',
            password:'',
            doc:'',
            type: ''
        };
        
        // -- private functions
        function signIn(email, password){
            return self.database.ref().child('users')
                .orderByChild('username')
                .equalTo(email)
                .orderByChild('username')
                .equalTo(hash(password))
                .on("value", function(response) {

                let user  = response.val();
                console.log(user);

                if(user){
                    createSession(user);
                    $rootScope.go('/home');
                }
            });
        }

        function createSession(user){
            $rootScope.session = {
                logged: true,
                id: user.key,
                name: user.name,
                type: user.type
            }
            sessionStorage.setItem('vetplex-session', JSON.stringify($rootScope.session));
        }

        function signUp(){
            console.log(11);
        }
    }

})();

