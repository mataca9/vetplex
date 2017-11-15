(function () {
    'use strict';
    angular.module('app')
        .controller('pageController', ['$scope', '$rootScope', 'toastr', '$timeout', 'userService', PageController]);

        
    function PageController($scope, $rootScope, toastr, $timeout, userService) {
        const params = JSON.parse(sessionStorage.getItem('params'));
        console.log(params);
        userService.getUser(params.id).then(function(snapshot){
            console.log(snapshot.val())
        });
    }

})();
