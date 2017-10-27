(function () {
    'use strict';
    angular.module('app')
        .controller('scheduleController', ['$scope', '$rootScope', 'toastr', '$timeout', 'firebaseService', ScheduleController]);

        
    function ScheduleController($scope, $rootScope, toastr, $timeout, firebaseService) {
        $scope.labelStatus = labelStatus;

        // Mock
        $scope.scheduleList = [];
        if ($rootScope.session.type == 'user'){
            $scope.scheduleList = [
                {
                    service: 'Tosa',
                    professional: ' Alfredo',
                    date: '10/11/2017 10:30',
                    place: 'Av. Ipiranga, 7200',
                    status: 'Pendente'
                },
                {
                    service: 'Castração',
                    professional: ' Rosana',
                    date: '12/11/2017 09:30',
                    place: 'Av. Protasio alves, 2350',
                    status: 'Aprovado'
                }
            ];
        } else {
            $scope.scheduleList = [

            ];
        }

        // private functions
        function labelStatus(status){
            switch(status){
                case 'Aprovado':
                    return 'label-success';
                case 'Pendente':
                    return 'label-warning';
                case 'Rejeitado':
                    return 'label-error';
                default:
                    return 'label-default';
            }
        }

        $scope.new = function (size, parentSelector) {
            
        };
    }

})();
