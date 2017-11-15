(function () {
    'use strict';
    angular.module('app')
        .controller('aboutController', ['$scope', '$rootScope', 'toastr', '$timeout', 'firebaseService', AboutController]);

        
    function AboutController($scope, $rootScope, toastr, $timeout, firebaseService) {		
    }

})();
