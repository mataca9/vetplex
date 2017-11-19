(function () {
    'use strict';
    
    angular.module('app')
    .service('userService', ['firebaseService', '$filter', UserService]);
    
    function UserService(firebase, $filter){

        var self = this;
        if(!firebase.running){
            firebase.init();
        }

        //-- Public
        self.createUser = createUser;
        self.getUser = getUser;
        self.getUsers = getUsers;
        self.getUserLogin = getUserLogin;
        self.getUserByEmail = getUserByEmail;
        self.getProfessionals = getProfessionals;
        self.updateUser = updateUser;
        
        //-- Methods
        function createUser(user){
            let password = $filter('hash')(user.password);
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
                firebase.database.ref('/users/').orderByChild('password').equalTo($filter('hash')(password)).once("value").then(function(snapshot){
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

        function getProfessionals(){
            return firebase.database.ref('/users/').orderByChild('type').equalTo("professional").once('value');
        }

        function updateUser(id, fields, rootKey) {
            let updates = {};
            let root = rootKey ? rootKey + '/' : '';

            let recursiveUpdate = function(currentKey, currentValue, currentPath){
                if(currentValue instanceof Object){
                    for (let key in currentValue) {
                        let path = currentPath ? currentPath+'/'+key : key;
                        recursiveUpdate(key, currentValue[key], path);
                    }
                } else {
                    updates[`/users/${id}/${root}${currentPath}`] = currentValue;
                }
            }

            recursiveUpdate(null, fields, '');
            return firebase.database.ref().update(updates);
        }
    }
})();