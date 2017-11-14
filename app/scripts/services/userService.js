(function () {
    'use strict';
    
    angular.module('app')
    .service('userService', ['firebaseService', UserService]);
    
    function UserService(firebase){

        var self = this;
        firebase.init();

        //-- Public
        self.createUser = createUser;
        self.getUser = getUser;
        self.getUsers = getUsers;
        self.getUserLogin = getUserLogin;
        self.getUserByEmail = getUserByEmail;
        
        //-- Methods
        function createUser(user){
            let password = hash(user.password);
            let newUser = JSON.parse(JSON.stringify(user));
            delete newUser.password2;
            newUser.password = password;
            return firebase.database.ref('users/').push(newUser);
        }

        function getUser(id){
            return firebase.database.ref('/users/' + id).once('value');
        }

        function getUsers(){
            return firebase.database.ref('/users/').once('value');
        }

        function getUserByEmail(email){
            return firebase.database.ref('/users/').orderByChild('email').equalTo(email).once("value");
        }

        function getUserLogin(email, password) {
            return  new Promise(function (resolve, reject) {
                firebase.database.ref('/users/').orderByChild('password').equalTo(hash(password)).once("value").then(function(snapshot){
                    if(snapshot.val()){
                        let users = snapshot.val();
                        let user = Object.keys(users).map(function(k){
                            users[k].id = k;
                            return users[k];
                        }).find(u => u.email == email);
                        if(user){
                            resolve(user);
                        }
                    }

                    reject('Senha ou email inválidos');
                });
            });
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