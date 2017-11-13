
(function () {
    'use strict';

    var _templateBase = './scripts';

    angular.module('app')    
    .config(toastrConfig);

    function toastrConfig(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 1,    
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: '.content',
            timeOut:1000
        });
    }

})();