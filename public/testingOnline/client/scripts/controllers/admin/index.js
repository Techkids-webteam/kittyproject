'use strict';

angular.module('quizApp')
    .controller('AdminCtrl', function ($scope, Auth, $http, $location, $window) {
        
        Auth.isAdmin(function (isAdmin) {
            if (isAdmin) {
                init();
            } else {
                $location.path('#/');
            }
        });

        function init() {

        }
    });
