'use strict';

angular.module('quizApp')
    .controller('InfoCtrl', function ($scope, Auth, $http, $location, $window) {

        Auth.isLoggedIn(function (isLoggedIn) {
            if (isLoggedIn) {
                init();
            } else {
                $location.path('#/');
            }
        });

        function init() {
        }
    });
