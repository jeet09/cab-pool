(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController)
        .directive('compareTo', compareTo);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService', 'ToastService'];
    function RegisterController(UserService, $location, $rootScope, FlashService, ToastService) {
        var vm = this;

        vm.register = register;
        vm.registerForm = {};

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.registerForm)
                .then(function (response) {
                    if (response.success) {
                        //FlashService.Success('Registration successful', true);
                        ToastService.Success('Registration successful');
                        $location.path('/login');
                    } else {
                        //FlashService.Error(response.message);
                        ToastService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

    compareTo.$inject = ['$interpolate', '$parse'];
    function compareTo($interpolate, $parse) {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {
    
                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };
    
                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    }

})();
