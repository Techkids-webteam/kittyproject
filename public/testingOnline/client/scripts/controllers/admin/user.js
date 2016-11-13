'use strict';

angular.module('quizApp')
    .controller('AdminUserCtrl', function ($scope, Auth, $http, User, Test, $location, $window, DateTime, LoadingMask) {

        $scope.users = [];

        $scope.show = {
            manage: true,
            add: false,
            update: false
        };

        $scope.userUpdate = {

        };

        $scope.testTitles = [];

        $scope.open = {

        };
        
        $scope.function = {
            fUpdate: function (user) {
                this.fSwitchPage('update');
                $scope.userUpdate = user;
            },
            fSwitchPage: function (page) {
                switch (page) {
                    case "add": {
                        setAllPropFalse($scope.show, 'add');
                        break;
                    }
                    case "manage": {
                        this.fGetUser();
                        setAllPropFalse($scope.show, 'manage');
                        break;
                    }
                    default: {
                        this.fGetTestTitle();
                        setAllPropFalse($scope.show, 'update');
                    }
                }
            },
            fGetUser: function (skip) {
                User.get(parseInt(skip) || 0, function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        $scope.users = docs;
                    }
                });
            },
            fAddTest: function () {
                var btn = $('#btnAddTest');
                LoadingMask.disable(btn);
                $scope.open.user = $scope.userUpdate;
                var cb = function (err) {
                    if (err) {
                        alert('Fail');
                        LoadingMask.enable(btn, 'Add');
                        this.fSwitchPage('manage');
                    } else {
                        alert('Success');
                        btn.prop('disabled', false);
                        LoadingMask.enable(btn, 'Add');
                        this.fSwitchPage('manage');
                    }
                }.bind(this);
                User.openTestForUser($scope.open, cb);
            },

            fGetTestTitle: function () {
                Test.getTitle(function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else
                        $scope.testTitles = docs;
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

        Auth.isAdmin(function (isAdmin) {
            if (isAdmin) {
                init();
            } else {
                $location.path('#/');
            }
        });

        function init() {
            $scope.function.fGetUser();
        }
    });
