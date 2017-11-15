(function () {
    'use strict';
    
    angular.module('app')
    .service('mapService', [MapService]);
    
    function MapService(){
        var self = this;

        self.map;
        self.geocoder;
        self.markers = [];
        self.places = [];
        
        //methods
        self.init = init;
        self.clearMarkers = clearMarkers;
        self.addMarkers = addMarkers;
        self.setRegion = setRegion;
        self.setPlaces = setPlaces;

        //-- Functions
        function init(ready) {
            self.map = new google.maps.Geocoder();
            self.geocoder = new google.maps.Geocoder();
            self.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4
            });

            self.geocoder.geocode( {'address' : 'brazil'}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    self.map.setCenter(results[0].geometry.location);
                    if(ready) ready();
                }
            });
        }

        function setRegion(region){
            self.geocoder.geocode( {'address' : region}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    self.map.setCenter(results[0].geometry.location);
                    self.map.setZoom(12);
                }
            });
        }

        function setPlaces(places){
            self.places = places;
        }

        function clearMarkers(){
            self.markers.forEach(function(marker) {
                marker.setMap(null);
            }, this);
        }

        function addMarkers() {
            self.places.forEach(p => {
                self.geocoder.geocode( { 'address': p.professional.address}, function(results, status) {
                    let content = `
                        <div id="content" style="max-width:300px">
                            <div id="siteNotice">
                            </div>
                            <h1 id="firstHeading" class="firstHeading">
                                ${p.name}
                            </h1>
                            <div id="bodyContent">
                                <p>
                                    ${p.professional.about}
                                </p>
                                <p>Rating: ${p.rating || 0}</p>
                            </div>
                        </div>`;


                    if (status == google.maps.GeocoderStatus.OK) {
                        let infowindow = new google.maps.InfoWindow({content});
                        let marker = new google.maps.Marker({
                            map: self.map,
                            position: results[0].geometry.location
                        });
                        marker.addListener('click', function() {
                            infowindow.open(map, marker);
                        });
                        self.markers.push(marker);
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            })
        }
    }
})();