(function () {
    'use strict';
    angular.module('app')
        .controller('configController', ['$scope', '$rootScope', 'toastr', '$timeout', 'userService', ConfigController]);


    function ConfigController($scope, $rootScope, toastr, $timeout, userService) {

      $scope.session = sessionStorage.getItem('vetplex-session');

      console.log(JSON.parse($scope.session).logged);

      userService.getUser($scope.session.id).then(function(user) {
        console.log(user.val());
      });

    }

})();
