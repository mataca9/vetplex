(function () {
    'use strict';
    angular.module('app')
        .controller('configController', ['$scope', '$rootScope', 'toastr', '$timeout', 'userService', '$filter', ConfigController]);


    function ConfigController($scope, $rootScope, toastr, $timeout, userService, $filter) {

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
				email: $scope.user.email,
				doc: $scope.user.doc
			};

			userService.updateUser($scope.user.id, updates).then(function(){
				toastr.success("Dados salvos com sucesso!");
			}, function(){
				toastr.error("Ocorreu um erro!");
			});
		}

		function savePassword() {
			var updates = {
				password: $filter('hash')($scope.user.password)
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

		//-- Init
        init();

	}

})();
