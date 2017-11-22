(function () {
    'use strict';
    angular.module('app')
        .controller('scheduleController', ['$scope', '$rootScope', 'toastr', '$timeout', '$filter', 'userService', 'scheduleService', ScheduleController]);


    function ScheduleController($scope, $rootScope, toastr, $timeout, $filter, userService, scheduleService) {

      var date = new Date();

        $scope.limitFilter = 5;
        $scope.rateScore = 0;
        $scope.statusFilter = '';
        $scope.modalSelect = null;
        $scope.scheduleList = [];
        $scope.professionals = [];
        $scope.professional = {};
        $scope.newAppointment = {};
        $scope.minDate = date.toJSON().split('T')[0]//.split('-').reverse().join('-');
        $scope.minTime = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        $scope.labelStatus = labelStatus;
        $scope.setAvailableServices = setAvailableServices;
        $scope.clearModal = clearModal;
        $scope.addAppointment = addAppointment;
        $scope.changeStatus = changeStatus;
        $scope.rateAppointment = rateAppointment;

        //Sets minDate to tomorrow if time's past 18h
        if (date.getHours() > 18) {
          date.setDate(date.getDate() + 1);
          $scope.minDate = date.toJSON().split('T')[0];
          $scope.minTime = "08:00";
        }

        // private functions
        function init() {
            getAppointments($rootScope.session.type, $rootScope.session.id);
            if ($rootScope.session.type == 'user'){
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
                    });
                });
            } else {
                userService.getUser($rootScope.session.id).then(function(snapshot){
                    $scope.professional = snapshot.val();
                })
            }
        }

        function getAppointments(type, id){
            scheduleService.getAppointments(type, id).then(function(snapshot){
                let appointments = [];
                for(let key in snapshot.val()){
                    let appointment = snapshot.val()[key];
                    appointment.id = key;
                    appointments.push(appointment);
                }

                $scope.scheduleList = appointments;

                $scope.$apply();
            });
        }

        function labelStatus(status){
            switch(status){
                case 1:
                case 3:
                    return 'label-warning';
                case 2:
                    return 'label-success';
                case 5:
                    return 'label-danger';
                case 4:
                default:
                    return 'label-default';
            }
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

        function addAppointment() {
            let appointment = {
                user: $rootScope.session.id,
                clientName: $rootScope.session.name,
                professionalName: $scope.newAppointment.professional.name,
                professional: $scope.newAppointment.professional.id,
                date: $filter('date')($scope.newAppointment.date, 'dd/MM/yyyy'),
                time: $filter('date')($scope.newAppointment.time, 'HH:mm'),
                service: $scope.newAppointment.service.key,
                status: 1
            }

            scheduleService.createAppointment(appointment).then(function(){
                toastr.success('Agendamento criado com sucesso, aguade avaliação do profissional.');
                getAppointments($rootScope.session.type, $rootScope.session.id);
            });
        };

        function changeStatus(id, status, rating){
            var updates = {
				status: status
            };

            if(rating){
                updates.rating = rating;
            }

			scheduleService.updateAppointment(id, updates).then(function(){
                toastr.success("Dados salvos com sucesso!");
                getAppointments($rootScope.session.type, $rootScope.session.id);
			}, function(){
				toastr.error("Ocorreu um erro!");
			});
        }

        function rateAppointment(id, rating){
            changeStatus(id, 6, rating);
        }

        init();

    }

})();
