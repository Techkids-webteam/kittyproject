'use strict';

/**
 * @ngdoc function
 * @name quizApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the quizApp
 */
angular.module('quizApp')
    .controller('UserCtrl', function ($scope, Auth, Test, $http, $window, DateTime) {
        $scope.show = {
            'table' : true
        };

        $scope.slicks;
        $scope.tests = [];

        var init = function () {
            Test.getSlick(function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    $scope.slicks = docs;
                    $(document).ready(slick());
                }
            });
            Test.getUserValidTest(function (err, docs) {
                if (err || !docs || docs.length < 1) {
                    $scope.show.alert = true;
                } else {
                    var regex = "wd dd MMM yyyy, hh:mm";
                    docs.forEach(function (ele, i) {
                        try {
                            ele.type = '';
                            ele.test.type.forEach(function (type, iType) {
                                ele.type += type + (iType < ele.test.type.length - 1 ? ",\r\n" : ".");
                            });
                            ele.openFrom = DateTime.convert(ele.openFrom, regex);
                            ele.openTo = DateTime.convert(ele.openTo, regex);
                        } catch (err) { }
                    });
                    $scope.tests = docs;
                }
            });
        }

        Auth.isLoggedIn(function (isLoggedIn) {
            if (isLoggedIn) {
                init();
            } else {
                $window.location.href = '/';
            }
        });

        function slick() {
            if ($('#slide-slick').children().length > 1) {
                $('.single-item').slick({
                    dots: true,
                    infinite: true,
                    speed: 1000,
                    fade: true,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    pauseOnFocus: true
                });
            } else {
                setTimeout(slick, 10);
            }
        }

        $scope.fGet = function () {
            Test.get(function (err, docs) {
                alert(docs.length);
            });
        }

        $scope.fStart = function (testTitle) {
            window.location.assign('/test?title=' + testTitle);
        };
  });
