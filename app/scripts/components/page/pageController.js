(function () {
    'use strict';
    angular.module('app')
        .controller('pageController', ['$scope', '$rootScope', 'toastr', '$timeout', 'userService', 'mapService', 'scheduleService', '$stateParams', PageController]);

        
    function PageController($scope, $rootScope, toastr, $timeout, userService, mapService, scheduleService, $stateParams) {        

        //-- Starting data
        $scope.professional = {
            name: 'Carregando...',
            address: 'Carregando...'
        };
        $scope.default = {
            noinfo: 'Informação não divulgada'
        };        
        $scope.rating = [0,0,0,0,0];

        //-- Methods
        function init() {
            userService.getUser($stateParams.id).then(function(snapshot){
                $scope.user = snapshot.val();
                $scope.user.id = $stateParams.id;          
                mapService.init(function(){
                    loadMap();
                });
                $scope.$apply();
            });

            scheduleService.getAppointments('professional', $stateParams.id).then(function(snapshot){
                let appointments = snapshot.val();
                appointments = Object.keys(appointments).map(a => appointments[a]);
                appointments = appointments.filter(a => a.status==6);
                if (appointments.length){
                    let rating = 0;
                    appointments.forEach(function(appointment){
                        rating += appointment.rating;
                    });
                    $scope.user.rating = rating / appointments.length;
                    $scope.rating = $scope.rating.map((v,i) => i < Math.floor($scope.user.rating) ? 1 : 0);
                    $scope.$apply();
                }
            })
        }

        function loadMap(){
            mapService.setPlaces([$scope.user]);
            mapService.clearMarkers();
            mapService.addMarkers();
            if($scope.user.professional.city){
                mapService.setRegion($scope.user.professional.address);
            }
        }

        //-- Init
        init();
    }

})();
