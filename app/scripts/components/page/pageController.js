(function () {
    'use strict';
    angular.module('app')
        .controller('pageController', ['$scope', '$rootScope', 'toastr', '$timeout', 'firebaseService', '$routeParams', PageController]);

        
    function PageController($scope, $rootScope, toastr, $timeout, firebaseService, $routeParams) {

        console.log($routeParams.ID);
		
    }

})();
