(function () {
    'use strict';
    angular.module('app')
        .controller('homeController', ['$scope', '$rootScope', 'toastr', '$timeout', HomeController]);

        
    function HomeController($scope, $rootScope, toastr, $timeout) {
        $scope.map;
        $scope.geocoder;

        // -- private functions
		(function init(){
            initMap();
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

        function addMarkers() {
            // mock data
            let places = [
                { name: 'Dog Health', address: 'Chafic joão scaf, 77', rating: 4},
                { name: 'PetLovers', address: 'Jari, 551', rating: 5}                
            ];

            places.forEach(p => {
                $scope.geocoder.geocode( { 'address': p.address}, function(results, status) {
                    let content = `
                        <div id="content">
                            <div id="siteNotice">
                            </div>
                            <h1 id="firstHeading" class="firstHeading">${p.name}</h1>
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
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            })
        }
    }

})();
