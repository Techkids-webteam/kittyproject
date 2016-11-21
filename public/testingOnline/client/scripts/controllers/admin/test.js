'use strict';

angular.module('quizApp')
    .controller('AdminTestCtrl', function ($scope, Auth, $http, $location, $window, Test, QuizBox, LoadingMask) {
        $scope.show = {
            add: true,
            update: false,
            manage: false
        }

        function init() {
            $scope.function.fGet();
        }

        Auth.isAdmin(function (isAdmin) {
            if (isAdmin) {
                init();
            } else {
                $location.path('/');
            }
        });

        $scope.QuizBox = QuizBox;

        $scope.test = {
            title: '',
            duration: 0,
            type: [],
            limit: true,
            quizs: []
        };

        $scope.tests = [];
        //TO DO: validate
        function validateTest() {
            $scope.test.type = $scope.QuizBox.type();
            $scope.test.quizs = $scope.QuizBox.ids();
            if (!$scope.test.title || !$scope.test.duration || $scope.test.duration <= 0) {
                alert('Please input title and duration, duration must greater than 0!');
                return false;
            }
            return true;
        }

        $scope.function = {
            fCreateTest: function () {
                if (validateTest()) {
                    var btn = $('#btnCreateTest');
                    LoadingMask.disable(btn);
                    Test.add(function (err) {
                        alert(err ? 'Fail!' : 'Success');
                        LoadingMask.enable(btn);
                    }, $scope.test);
                }
            },

            fSwitchPage: function (page) {
                switch (page) {
                    case "add": {
                        setAllPropFalse($scope.show, 'add');
                        break;
                    }
                    case "manage": {
                        this.fGet();
                        setAllPropFalse($scope.show, 'manage');
                        break;
                    }
                    default: {
                        setAllPropFalse($scope.show, 'update');
                    }
                }
            },

            fGet: function () {
                Test.get(0, function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        $scope.tests = docs;
                    }
                });
            }
        }

        function setAllPropFalse(obj, keyTrue) {
            if (obj) {
                for (var key in obj) {
                    if (keyTrue != key)
                        obj[key] = false;
                    else
                        obj[key] = true;
                }
            }
        }
        
    });
