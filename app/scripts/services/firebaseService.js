(function () {
    'use strict';
    
    angular.module('app')
    .service('firebaseService', [FirebaseService]);
    
    function FirebaseService(){
        /** Instruction:
         *  First of all, you have to inject the firebaseService angular service on the desired controller.
         *  To start to use, you have to run the method init to config the firebase service.
         *  eg.: firebaseService.init();
         */ 

        var self = this;
        self.init = init;

        //methods
        self.createUser = createUser;
        self.getUser = getUser;
        self.getUsers = getUsers;
        self.getUserLogin = getUserLogin;

        //-- Functions
        function init(){
            let config = {
                apiKey: "AIzaSyChaRfGQtK3uQQ0Kqf7Xud1DlXYlz6OV9A",
                authDomain: "vetplex-bfea3.firebaseapp.com",
                databaseURL: "https://vetplex-bfea3.firebaseio.com",
                projectId: "vetplex-bfea3",
                storageBucket: "vetplex-bfea3.appspot.com",
                messagingSenderId: "313105455552"
            };
            self.app = firebase.initializeApp(config);
            self.database = self.app.database();        
        };
        
        //-- Methods
        function createUser(name, email){
            return self.database.ref('users/').push({
                username: name,
                email: email
            });
        }

        function getUser(id){
            return self.database.ref('/users/' + id).once('value');
        }

        function getUsers(){
            return self.database.ref('/users/').once('value');
        }

        function hash(s) {
            var a = 1, c = 0, h, o;
            if (s) {
                a = 0;
                for (h = s.length - 1; h >= 0; h--) {
                    o = s.charCodeAt(h);
                    a = (a<<6&268435455) + o + (o<<14);
                    c = a & 266338304;
                    a = c!==0?a^c>>21:a;
                }
            }
            return String(a);
        }
    }
})();