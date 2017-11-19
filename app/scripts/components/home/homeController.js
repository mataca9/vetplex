(function () {
    'use strict';
    angular.module('app')
        .controller('homeController', ['$scope', '$rootScope', 'toastr', '$timeout', 'mapService', 'userService', HomeController]);

        
    function HomeController($scope, $rootScope, toastr, $timeout, mapService, userService) {
        $scope.professionals = [];
        //{ name: 'Zoo Life', address: 'Protasio Alves, 2000', rating: 2, service:1, region:"leste"}             
        $scope.loadMap = loadMap;
        $scope.filter = {
            service: 0,
            city: 0
        }

        // -- private functions
        function init () {
            userService.getProfessionals().then(function(snapshop){
                let professionals = [];
                for(let key in snapshop.val()){
                    let professional = snapshop.val()[key];
                    professional.id = key;
                    professionals.push(professional);
                }
                $scope.professionals = professionals.filter(p => p.professional && p.professional.visible);
                $scope.filtered = $scope.professionals.slice();
                mapService.init(function(){
                    loadMap();
                });
                $scope.$apply();
            })
        }

        function loadMap(){
            $scope.filtered = [];                               
            $scope.professionals.forEach(function(place){
                let add = true;

                if(($scope.filter.city && $scope.filter.city != place.professional.city) ||
                    ($scope.filter.service && !place.professional.service[$scope.filter.service])
                ){
                    add = false;
                }

                if(add){
                    $scope.filtered.push(place);                    
                }
            });            
            mapService.setPlaces($scope.filtered);
            mapService.clearMarkers();
            mapService.addMarkers();
            if($scope.filter.city){
                mapService.setRegion($scope.filter.city);
            } else {
                mapService.unsetRegion();
            }
        }

        // -- Init
        init();
    }

})();
