
(function () {
    'use strict';

    angular.module('app')
    .controller('mainController', ['$scope', '$rootScope', '$routeParams', '$location', '$timeout', '$interval', 'toastr', MainController]);

    function MainController($scope, $rootScope, $routeParams, $location, $timeout, $interval, toastr){
		$scope.teste = 'hello world';
    }

})();