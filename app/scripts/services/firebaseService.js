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
        // example of methods (not the real data using on vetplex project)
        self.createUser = createUser;
        self.getUser = getUser;

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
        
        //-- example of methods
        function createUser(userId, name, email, imageUrl){
            self.database.ref('users/' + userId).set({
                username: name,
                email: email,
                profile_picture : imageUrl
            });
        }

        function getUser(userId){
            // returns a promise
            return self.database.ref('/users/' + userId).once('value');
            /** example of usage (print user on console):
             *  firebaseService.getUser(2).then(function(snapshot){
             *      console.log(snapshot.val());
             *  })
             */ 
        }
    }
})();