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
        self.defaultLocation;
        
        //methods
        self.init = init;
        self.clearMarkers = clearMarkers;
        self.addMarkers = addMarkers;
        self.setRegion = setRegion;
        self.setPlaces = setPlaces;
        self.unsetRegion = unsetRegion;

        //-- Functions
        function init(ready) {
            self.map = new google.maps.Geocoder();
            self.geocoder = new google.maps.Geocoder();
            self.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 3
            });

            self.geocoder.geocode( {'address' : 'brazil'}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    self.defaultLocation = results[0].geometry.location;
                    self.map.setCenter(self.defaultLocation);
                    if(ready) ready();
                }
            });
        }

        function setRegion(region, withoutZoom){
            self.geocoder.geocode( {'address' : region}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    self.map.setCenter(results[0].geometry.location);
                    if(!withoutZoom){
                        self.map.setZoom(11);
                    }
                }
            });
        }

        function unsetRegion() {
            self.map.setCenter(self.defaultLocation);
            self.map.setZoom(3);
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
                                <p class="page-text">
                                    ${p.professional.about}
                                </p>
                                <a class="page-link" href="#!/page/${p.id}">Visitar página</a>
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