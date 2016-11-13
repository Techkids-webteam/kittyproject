'use strict';

/**
 * @ngdoc function
 * @name quizApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the quizApp
 */
angular.module('quizApp')
    .controller('MainCtrl', function ($scope, Auth, $http, $location, $rootScope, $window) {
        $scope.show = {
            register: false,
            login: false
        };

        $scope.goRegister = function () {
            $scope.show.login = false;
            $scope.show.register = true;
        };

        $scope.goLogin = function () {
            $scope.show.login = true;
            $scope.show.register = false;
        };

        $scope.formData = {};

        $scope.fLogin = function () {
            Auth.login($scope.formData, function (err) {
                //$scope.user = $scope.user || {};
                if (err) {
                    alert(err);
                } else {
                    $window.location.href = ('#/' + $scope.user.role || '');
                }
            });
        };

        $scope.formRegister = {
            gender: 'Male'
        }

        $scope.register = {
            genders: [
                'Male',
                'Female',
                'Else'
            ]
        };

        $scope.fRegister = function () {
            Auth.register($scope.formRegister, function (err) {
                if (err) {
                    alert(err);
                } else {
                    $scope.show.login = true;
                    $scope.show.register = false;   
                    $scope.formData.username = $scope.formRegister.username;
                }
            });
        }
        function init() {
            Auth.isLoggedIn(function (isLoggedIn) {
                if (isLoggedIn) {
                    var x = $scope;
                    if ($rootScope.user.role == 'admin') {
                        $window.location.href = ('#/admin');
                    } else {
                        $window.location.href = ('#/user');
                    }
                } else
                    $scope.show.login = true;
            });
        }
        init();
    });
