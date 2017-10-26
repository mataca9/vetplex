(function () {
    'use strict';
    angular.module('app')
        .controller('homeController', ['$scope', '$rootScope', 'toastr', '$timeout', HomeController]);

        
    function HomeController($scope, $rootScope, toastr, $timeout) {
        $scope.map;
        $scope.geocoder;
        $scope.markers = [];
        $scope.loadMap = loadMap;
        $scope.places = [
            { name: 'Dog Health', address: 'Chafic joão scaf, 77', rating: 4, service:1},
            { name: 'PetLovers', address: 'Jari, 551', rating: 5, service:1},
            { name: 'Cat Dreams', address: 'Avenida Ipiranga, 7200', rating: 3, service:2},
            { name: 'Zoo Life', address: 'Protasio Alves, 2000', rating: 2, service:2}             
        ];

        // -- private functions
		(function init(){
            if(!$scope.map){
                initMap();  
            }
        })();

        function initMap () {
            $scope.geocoder = new google.maps.Geocoder();
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12
            });

            $scope.geocoder.geocode( {'address' : 'porto alegre'}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $scope.map.setCenter(results[0].geometry.location);
                }
            });

            addMarkers();
        }

        function addMarkers(filter) {
            // mock data
            $scope.places
            let filtered = filter ? $scope.places.filter(p => p.service == filter) : $scope.places;
            filtered.forEach(p => {
                $scope.geocoder.geocode( { 'address': p.address}, function(results, status) {
                    let content = `
                        <div id="content">
                            <div id="siteNotice">
                            </div>
                            <h1 id="firstHeading" class="firstHeading">
                                ${p.name}
                            </h1>
                            <div id="bodyContent">
                                <p>
                                    Some text
                                </p>
                                <p>Rating: ${p.rating}</p>
                            </div>
                        </div>`;


                    if (status == google.maps.GeocoderStatus.OK) {
                        let infowindow = new google.maps.InfoWindow({content});
                        let marker = new google.maps.Marker({
                            map: $scope.map,
                            position: results[0].geometry.location
                        });
                        marker.addListener('click', function() {
                            infowindow.open(map, marker);
                        });
                        $scope.markers.push(marker);
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            })
        }

        function loadMap(){
            clearMarkers();
            addMarkers($scope.service);
        }

        function clearMarkers(){
            $scope.markers.forEach(function(marker) {
                marker.setMap(null);
            }, this);
        }
    }

})();
