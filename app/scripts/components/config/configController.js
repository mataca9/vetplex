(function () {
    'use strict';
    angular.module('app')
        .controller('configController', ['$scope', '$rootScope', 'toastr', '$timeout', 'userService', ConfigController]);


    function ConfigController($scope, $rootScope, toastr, $timeout, userService) {

		$scope.user = {};
		$scope.saveGeneral = saveGeneral;
		$scope.savePassword = savePassword;
		$scope.saveProfessional = saveProfessional;

		//-- Methods
		function init() {			
			userService.getUser($scope.session.id).then(function(snapshot) {
				$scope.user = snapshot.val();
				$scope.user.id = $scope.session.id;
				if(!$scope.user.professional){
					$scope.user.professional = {
						visible: false,
						rating: 0,
						service: {
							clinic: false,
							surgery: false,
							wash: false,
							shear: false,
							sell: false
						}
					};
				}
				$scope.$apply();
			});
		}

		function saveGeneral() {
			var updates = {
				name: $scope.user.name,
				email: $scope.user.email
			};

			userService.updateUser($scope.user.id, updates).then(function(){
				toastr.success("Dados salvos com sucesso!");
			}, function(){
				toastr.error("Ocorreu um erro!");
			});
		}

		function savePassword() {
			var updates = {
				password: hash($scope.user.password)
			};

			userService.updateUser($scope.user.id, updates).then(function(){
				toastr.success("Dados salvos com sucesso!");
			}, function(){
				toastr.error("Ocorreu um erro!");
			});
		}

		function saveProfessional() {
			userService.updateUser($scope.user.id, $scope.user.professional, "professional").then(function(){
				toastr.success("Dados salvos com sucesso!");
			}, function(){
				toastr.error("Ocorreu um erro!");
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

		//-- Init
        init();

	}

})();
