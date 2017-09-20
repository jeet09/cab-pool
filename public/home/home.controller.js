(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', 'CarOwnerService', '$rootScope'];
    function HomeController(UserService, CarOwnerService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allCars = [];
        vm.getFromLocation = getFromLocation;
        vm.getToLocation = getToLocation;

        initController();

        function initController() {
            loadCurrentUser();
            //loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                });
            CarOwnerService.GetAll()
                .then(function(cars) {
                    vm.allCars = cars;
                });
        }

        function getFromLocation() {
            CarOwnerService.GetByFrom(vm.startingFrom)
                .then(function(cars) {
                    vm.allCars = cars;
                });
        }

        function getToLocation() {
            CarOwnerService.GetByTo(vm.startingFrom, vm.destination)                                                                       
                .then(function(cars) {
                    vm.allCars = cars;
                });
        }



        // function loadAllUsers() {
        //     UserService.GetAll()
        //         .then(function (users) {
        //             vm.allUsers = users;
        //         });
        // }

        // function deleteUser(id) {
        //     UserService.Delete(id)
        //     .then(function () {
        //         loadAllUsers();
        //     });
        // }
    }

})();