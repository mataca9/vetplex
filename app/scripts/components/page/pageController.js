(function () {
    'use strict';
    angular.module('app')
        .controller('pageController', ['$scope', '$rootScope', 'toastr', '$timeout', 'userService', 'mapService', '$stateParams', PageController]);

        
    function PageController($scope, $rootScope, toastr, $timeout, userService, mapService, $stateParams) {        

        //-- Starting data
        $scope.professional = {
            name: 'Carregando...',
            address: 'Carregando...'
        };
        $scope.default = {
            noinfo: 'Informação não divulgada'
        };        
        $scope.rating = [0,0,0,0,0];

        $scope.translateService = translateService;

        //-- Methods
        function init() {
            userService.getUser($stateParams.id).then(function(snapshot){
                $scope.user = snapshot.val();
                $scope.rating = $scope.rating.map((v,i) => i < Math.floor($scope.user.rating) ? 1 : 0);
                console.log($scope.user)
                mapService.init(function(){
                    loadMap();
                });
                $scope.$apply();
            });
        }

        function loadMap(){
            mapService.setPlaces([$scope.user]);
            mapService.clearMarkers();
            mapService.addMarkers();
            if($scope.user.professional.city){
                mapService.setRegion($scope.user.professional.city);
            }
        }

        function translateService(service){
            switch(service){
                case 'clinic': return 'Atendimento clínico';
                case 'shear': return 'Tosa';
                case 'surgery': return 'Procedimentos cirurgicos';
                case 'wash': return 'Banho';
                case 'sell': return 'Varejo';
            }
        }

        //-- Init
        init();
    }

})();
