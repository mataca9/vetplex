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

        //-- Methods
        function init() {
            userService.getUser($stateParams.id).then(function(snapshot){
                $scope.user = snapshot.val();
                $scope.user.id = $stateParams.id;
                $scope.rating = $scope.rating.map((v,i) => i < Math.floor($scope.user.rating) ? 1 : 0);
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
                mapService.setRegion($scope.user.professional.address);
            }
        }

        //-- Init
        init();
    }

})();
