(function () {
    'use strict';
    angular.module('app')
        .controller('homeController', ['$scope', '$rootScope', 'toastr', '$timeout', HomeController]);

        
    function HomeController($scope, $rootScope, toastr, $timeout) {
		$scope.message = "home";
		$timeout(()=> { toastr.success('sucesso') },2000);
    }

})();
