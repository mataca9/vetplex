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
                case 'status_1': return 'Pendente';
                case 'status_2': return 'Aprovado';
                case 'status_3': return 'Em avaliação';
                case 'status_4': return 'Cancelado';
                case 'status_5': return 'Rejeitado';
                case 'status_6': return 'Concluído';
            }

            return word;    
        }
    }
})();