(function () {
    'use strict';
    
    angular.module('app')
    .filter('translate', [TranslateFilter]);
    
    function TranslateFilter(){
        return function(word) {

            switch(word){
                case 'clinic': return 'Atendimento clínico';
                case 'shear': return 'Tosa';
                case 'surgery': return 'Procedimentos cirurgicos';
                case 'wash': return 'Banho';
                case 'sell': return 'Varejo';
            }

            return word;    
        }
    }
})();