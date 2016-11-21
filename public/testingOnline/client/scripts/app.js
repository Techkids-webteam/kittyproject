'use strict';

/**
 * @ngdoc overview
 * @name quizApp
 * @description
 * # quizApp
 *
 * Main module of the application.
 */
angular
    .module('quizApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'authService',
        'testServices',
        'dateTimeServices',
        'quizServices',
        'loadingMaskServices'
    ])
    .config(function ($routeProvider, $httpProvider, $locationProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
        //$httpProvider.defaults.headers.put = { "Content-Type": "application/json;charset=utf-8" };
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/user', {
                templateUrl: 'views/user.html',
                controller: 'UserCtrl',
                controllerAs: 'user'
            })
            .when('/info', {
                templateUrl: 'views/info.html',
                controller: 'InfoCtrl',
                controllerAs: 'info'
            })
            .when('/test', {
                templateUrl: 'views/test.html',
                controller: 'TestCtrl',
                controllerAs: 'test'
            })
            .when('/test2', {
                templateUrl: 'views/test2.html',
                controller: 'Test2Ctrl',
                controllerAs: 'test2'
            })
            .when('/admin', {
                templateUrl: 'views/admin/index.html',
                controller: 'AdminCtrl',
                controllerAs: 'admin'
            })
            .when('/admin/quiz', {
                templateUrl: 'views/admin/quiz.html',
                controller: 'AdminQuizCtrl',
                controllerAs: 'adminQuiz'
            })
            .when('/admin/test', {
                templateUrl: 'views/admin/test.html',
                controller: 'AdminTestCtrl',
                controllerAs: 'adminTest'
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/user.html',
                controller: 'AdminUserCtrl',
                controllerAs: 'adminUser'
            })
            .otherwise({
                redirectTo: '/'
            });
        //check browser support
        if (window.history && window.history.pushState) {
            //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

            // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

            // if you don't wish to set base URL then use this
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    });
