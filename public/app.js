(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'ngMaterial', 'ngMessages', 'ngMap'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$mdThemingProvider'];
    function config($routeProvider, $locationProvider, $mdThemingProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });


    $mdThemingProvider.definePalette('black', {
        '50': '000000',
        '100': '000000',
        '200': '000000',
        '300': '000000',
        '400': '000000',
        '500': '000000',
        '600': '000000',
        '700': '000000',
        '800': '000000',
        '900': '000000',
        'A100': '000000',
        'A200': '000000',
        'A400': '000000',
        'A700': '000000',
        'contrastDefaultColor': 'light'
        });
        $mdThemingProvider.definePalette('white', {
        '50': 'ffffff',
        '100': 'ffffff',
        '200': 'ffffff',
        '300': 'ffffff',
        '400': 'ffffff',
        '500': 'ffffff',
        '600': 'ffffff',
        '700': 'ffffff',
        '800': 'ffffff',
        '900': 'ffffff',
        'A100': 'ffffff',
        'A200': 'ffffff',
        'A400': 'ffffff',
        'A700': 'ffffff',
        'contrastDefaultColor': 'dark'
        });
    
        $mdThemingProvider.theme('default')
        .primaryPalette('black')
        .backgroundPalette('white');
       
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();