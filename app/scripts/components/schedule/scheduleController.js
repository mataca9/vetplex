(function () {
    'use strict';
    angular.module('app')
        .controller('scheduleController', ['$scope', '$rootScope', 'toastr', '$timeout', 'firebaseService', ScheduleController]);

        
    function ScheduleController($scope, $rootScope, toastr, $timeout, firebaseService) {
        $scope.labelStatus = labelStatus;
        $scope.limitFilter = 2;
        $scope.statusFilter = '';
        $scope.changeStatus = changeStatus;
        $scope.modalSelect = null;
        // Mock
        $scope.scheduleList = [];
        if ($rootScope.session.type == 'user'){
            $scope.scheduleList = [
                {
                    service: 'Tosa',
                    professional: ' Alfredo',
                    cliente: 'Roger',
                    date: '10/11/2017 10:30',
                    place: 'Av. Ipiranga, 7200',
                    status: 'Pendente'
                },
                {
                    service: 'Castração',
                    professional: ' Rosana',
                    cliente: 'Frank',
                    date: '12/11/2017 09:30',
                    place: 'Av. Protasio alves, 2350',
                    status: 'Aprovado'
                },
                {
                    service: 'Castração',
                    professional: ' Rosana',
                    cliente: 'Bob',
                    date: '12/11/2017 09:30',
                    place: 'Av. Protasio alves, 2350',
                    status: 'Rejeitado'
                },
                {
                    service: 'Castração',
                    professional: ' Rosana',
                    cliente: 'Aroldo',
                    date: '12/11/2017 09:30',
                    place: 'Av. Protasio alves, 2350',
                    status: 'Concluído'
                }
            ];
        } else {
            $scope.scheduleList = [
                {
                    service: 'Tosa',
                    professional: ' Alfredo',
                    cliente: 'Roger',
                    date: '10/11/2017 10:30',
                    place: 'Av. Ipiranga, 7200',
                    status: 'Pendente'
                },
                {
                    service: 'Castração',
                    professional: ' Rosana',
                    cliente: 'Frank',
                    date: '12/11/2017 09:30',
                    place: 'Av. Protasio alves, 2350',
                    status: 'Aprovado'
                },
                {
                    service: 'Castração',
                    professional: ' Rosana',
                    cliente: 'Bob',
                    date: '12/11/2017 09:30',
                    place: 'Av. Protasio alves, 2350',
                    status: 'Rejeitado'
                },
                {
                    service: 'Castração',
                    professional: ' Rosana',
                    cliente: 'Aroldo',
                    date: '12/11/2017 09:30',
                    place: 'Av. Protasio alves, 2350',
                    status: 'Concluído'
                }
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
                    return 'label-danger';
                case 'Concluído':
                default:
                    return 'label-default';
            }
        }

        function changeStatus(schedule, status){
            schedule.status = status;
        }

        $scope.new = function (size, parentSelector) {
            
        };
        
    }

})();
