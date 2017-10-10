(function () {
    'use strict';
    
    angular.module('app')
    .service('firebaseService', [FirebaseService]);
    
    function FirebaseService($rootScope){
        var self = this;
        
        self.addSomething = addSomething;
        
        function addSomething(){
            console.log('working');
        }
    }
})();