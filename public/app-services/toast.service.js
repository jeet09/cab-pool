(function () {
    'use strict';

    angular
        .module('app')
        .factory('ToastService', ToastService);

        ToastService.$inject = ['$mdToast'];
    function ToastService($mdToast) {
        var service = {};

        service.Success = Success;
        service.Error = Error;

        

        return service;

        

        function Success(message) {
            
            $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .toastClass("toast-success")
                .position("top right")
                .hideDelay(3000)
            );
        }

        function Error(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .toastClass("toast-error")
                    .position("top right")
                    .hideDelay(3000)
                );
        }
    }

})();