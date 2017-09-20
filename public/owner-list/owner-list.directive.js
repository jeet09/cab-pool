(function () {
    'use strict';

    angular
        .module('app')
        .directive('ownerList', ownerList);
    
    function ownerList() {
        return {
            restrict: 'E',
            scope: {
                users: "=owners"
            },
            templateUrl:'/owner-list/owner-list.template.html',
            controller: ownerListController,
            controllerAs: 'vm',
           
            bindToController: true
        };
    }
    
    ownerListController.$inject = ['NgMap', 'ToastService'];
    function ownerListController(NgMap, ToastService) {
        var vm = this;
        
        vm.centerLocation = "12.9716,77.5946"
        vm.confirmRide = confirmRide;
        NgMap.getMap().then(function(map) {
            vm.showCustomMarker= function(evt, item) {
              vm.ownerInfo = vm.users[item];
              vm.centerLocation = vm.ownerInfo.from_cordinates;
              map.customMarkers.foo.setVisible(true);
              map.customMarkers.foo.setPosition(this.getPosition());
            };
            vm.closeCustomMarker= function(evt) {
              this.style.display = 'none';
            };
            vm.closeCustomMarker();
        });


        
        
        function confirmRide() {
            ToastService.Success('Cab Booked Successfully!');
        };
        
        
    }

})();
