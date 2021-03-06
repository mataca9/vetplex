(function () {
    'use strict';
    
    angular.module('app')
    .filter('hash', [HashFilter]);
    
    function HashFilter(){
        return function(s) {
            let a = 1, c = 0, h, o;
            if (s) {
                a = 0;
                for (h = s.length - 1; h >= 0; h--) {
                    o = s.charCodeAt(h);
                    a = (a<<6&268435455) + o + (o<<14);
                    c = a & 266338304;
                    a = c!==0?a^c>>21:a;
                }
            }

            let output = String(a);
            return output;    
        }
    }
})();