(function () {
    'use strict';
    angular.module('app')
        .controller('scheduleController', ['$scope', '$rootScope', 'toastr', '$timeout', '$filter', 'userService', 'scheduleService', ScheduleController]);

        
    function ScheduleController($scope, $rootScope, toastr, $timeout, $filter, userService, scheduleService) {
        $scope.limitFilter = 2;
        $scope.statusFilter = '';
        $scope.modalSelect = null;
        $scope.scheduleList = [];
        $scope.professionals = [];
        $scope.newAppointment = {};
        $scope.minDate = new Date().toJSON().split('T')[0]//.split('-').reverse().join('-');
        $scope.labelStatus = labelStatus;
        $scope.changeStatus = changeStatus;
        $scope.setAvailableServices = setAvailableServices;
        $scope.clearModal = clearModal;
        // Mock
        /*
        if ($rootScope.session.type == 'user'){
            $scope.scheduleList = [
                {
                    service: 'Tosa',
                    professional: ' Alfredo',
                    client: 'Roger',
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
        }*/

        // private functions
        function init() {
            if ($rootScope.session.type == 'user'){
                scheduleService.getAppointments('user', $rootScope.session.id).then(function(snapshot){

                });

                userService.getProfessionals().then(function(snapshot){
                    let professionals = [];
                    for(let key in snapshot.val()){
                        let professional = snapshot.val()[key];
                        professional.id = key;
                        professionals.push(professional);
                    }
                    $scope.professionals = professionals.filter(p => p.professional && p.professional.visible);
                    $scope.professionals.forEach(function(p){
                        setAvailableServices(p);
                    })
                });
            } else {

            }
        }

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

        function setAvailableServices(professional) {
            if(!professional) return;

            let serviceObject = function(service){
                return {
                    name: $filter('translate')(service),
                    type: getServiceType(service),
                    key: service
                }
            }

            let services = professional.professional.service;
            services = Object.keys(services).filter(key => services[key]).map(s => serviceObject(s));

            professional.availableServices = services;
        }

        function getServiceType(service){
            switch(service){
                case 'clinic':
                case 'surgery':
                    return 'vet';
                case 'shear':
                case 'wash':
                    return 'pet';
                default:
                    return 'other';
            }
        }

        function clearModal(){
            $scope.modalSelect = null;
            $scope.newAppointment = {};
            $scope.appointmentForm.$setPristine();
        }

        $scope.new = function (size, parentSelector) {
            
        };

        init();
        
    }

})();
