(function () {
    'use strict';

    angular
        .module('app')
        .factory('CarOwnerService', CarOwnerService);

    CarOwnerService.$inject = ['$http'];
    function CarOwnerService($http) {
        var service = {};

        service.GetAll = GetAll;

        // Get By from & to
        service.GetByFrom = GetByFrom;
        service.GetByTo = GetByTo;

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetByFrom(from) {
            return $http.get('/api/users?from=' + from).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetByTo(from, to) {
            if((typeof from === 'undefined' || from === '') && (typeof to === 'undefined'|| to === '')) {
                return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
            } else {
                return $http.get('/api/users?from='+from+'&to='+to).then(handleSuccess, handleError('Error getting all users'));
            }
            
        }

        
        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
