(function () {
    'use strict';
    
    angular.module('app')
    .service('scheduleService', ['firebaseService', '$filter', ScheduleService]);
    
    function ScheduleService(firebase, $filter){

        var self = this;
        if(!firebase.running){
            firebase.init();
        }

        //-- Public
        self.createAppointment = createAppointment;
        self.getAppointment = getAppointment;
        self.getAppointments = getAppointments;
        self.updateAppointment = updateAppointment;
        
        //-- Methods
        function createAppointment(appointment){
            let newAppointment = JSON.parse(JSON.stringify(appointment));
            return firebase.database.ref('appointments/').push(newAppointment);
        }

        function getAppointment(id){
            return firebase.database.ref('/appointments/' + id).once('value');
        }

        function getAppointments(type, id){
            if (type && id) {
                return firebase.database.ref('/appointments/').orderByChild(type).equalTo(id).once('value');
            } else {                
                return firebase.database.ref('/appointments/').once('value');
            }
        }

        function updateAppointment(id, fields, rootKey) {
            let updates = {};
            let root = rootKey ? rootKey + '/' : '';

            let recursiveUpdate = function(currentKey, currentValue, currentPath){
                if(currentValue instanceof Object){
                    for (let key in currentValue) {
                        let path = currentPath ? currentPath+'/'+key : key;
                        recursiveUpdate(key, currentValue[key], path);
                    }
                } else {
                    updates[`/appointments/${id}/${root}${currentPath}`] = currentValue;
                }
            }

            recursiveUpdate(null, fields, '');
            return firebase.database.ref().update(updates);
        }
    }
})();