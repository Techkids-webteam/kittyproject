'use strict';
angular.module('quizApp')
    .controller('TestCtrl', function ($scope, Test, $http, Auth, DateTime, $location, $window) {

        var time = 5,
            titleUrl = $location.search().title,
            count,
            setup = false;

        $scope.show = {
            loading: true,
            doingTest: false,
            alert: false,
            showAll: false,
            result: false
        };

        $scope.test = { quizs: [], answers: {} };

        $scope.result = {}

        function countDo() {
            if (!time || time < 0) $scope.fSubmit();
            else {
                $('#timeleft').text(format(--time));
                count = setTimeout(countDo, 1000);
            }
        }

        function format(time) {
            return !(time = parseInt(time)) ? '00:00:00' : get2(time / 3600) + ':' + get2(time % 3600 / 60) + ':' + get2(time % 3600 % 60);
        }

        //function fFail(mess) {
        //    $('#timeleft').text(mess || 'Something went wrong');
        //    time = 5;
        //    countFail();
        //} function fDisable(doc) {
        //    try {
        //        if (doc) {
        //            doc.prop('disabled', true);
        //            if (doc.children()) fDisable(doc.children());
        //        }
        //    } catch (err) { }
        //}

        function fDisable(doc) {
            try {
                if (doc) {
                    doc.prop('disabled', true);
                    if (doc.children()) fDisable(doc.children());
                }
            } catch (err) { }
        }

        $scope.fSubmit = function () {
            var btn = $('#btnSubmit');
            btn.prop('disabled', true);
            btn.text("");
            btn.append($("<i class='fa fa-spinner' aria-hidden='true'>")); 
            fDisable($('#quiz-container'));
            clearTimeout(count);
            Test.submitTest(titleUrl, { title: $scope.test.title, answers: $scope.test.answers }, function (err, result) {
                if (err) {
                    btn.removeClass('btn-primary');
                    btn.addClass('btn-danger');
                    btn.empty();
                    btn.prop('disabled', false);
                    btn.text('Submit fail!! Resubmit');
                } else {
                    $scope.show.doingTest = false;
                    $scope.show.result = true;
                    //btn.empty();
                    //btn.text('Submited!');
                    $scope.result = result;
                }
            });
        }

        var focusNow;

        $scope.fShowQuiz = function () {
            var showAll = ($scope.show.showAll = !$scope.show.showAll);
            $('#btnShowQuiz').text(showAll ? 'Show One' : 'Show All');
            $scope.test.quizs.forEach(function (quiz, iq) {
                var eles = $('.quiz' + quiz.order);
                if (showAll) {
                    eles.show();
                } else {
                    eles.hide();
                }
            });
            try {
                focusNow = $('.quiz' + $scope.test.quizs[0].order);
                if (!showAll) {
                    focusNow.show();
                }
            } catch (err) { }
        }

        function groupQuiz() {
            var quizs = $scope.test.quizs;
            if (quizs && quizs.length > 0) {
                var newQuizs = [];
                var quizGroups = [];
                var iqg = -1;
                var count = 0;
                quizs.forEach(function (quiz, iq) {
                    quiz.subQuizs.forEach(function (subQuiz, isq) {
                        subQuiz.order = get2(count + 1);
                        subQuiz.stimulus = isq == 0 ? quiz.stimulus : undefined;
                        subQuiz.stimulusFor = isq == 0 ? get2(count + quiz.subQuizs.length) : undefined;
                        if (count++ % 20 == 0) {
                            quizGroups.push([]);
                            iqg++;
                        }
                        quizGroups[iqg].push(subQuiz.order);
                        newQuizs.push(subQuiz);
                    });
                });
                $scope.test.quizGroups = quizGroups;
                $scope.test.quizs = newQuizs;
            }
        }

        function addStimulus() {
            var quizs = $scope.test.quizs;
            if (quizs && quizs.length) {
                quizs.forEach(function (quiz, ele) {
                    if (quiz.stimulus) {
                        var clazz = '';
                        for (var i = 0; i < parseInt(quiz.stimulusFor) - parseInt(quiz.order) + 1; i++)
                            clazz += 'quiz' + get2(parseInt(quiz.order) + i) + ' ';
                        var lb = $("<label style='background-color:#e6e6ff;text-decoration:initial;' class='" + clazz + "'>" + quiz.stimulus + "<span style='color:red;'> (This use for question from " + quiz.order
                            + ' to ' + quiz.stimulusFor + ")</span></label>");
                        lb.insertBefore($(document).find('.quiz' + quiz.order));
                    }
                });
            }
        }

        function get2(time) {
            return !(time = parseInt(time)) ? '00' : time > 9 || time < 0 ? time : '0' + time;
        }

        function get4(num) {
            return !(num = parseInt(num)) ? '0000' : num > 999 || num < 0 ? num % 10000 : num > 999 ? num : num > 99 ? '0' + num : num > 9 ? '00' + num : '000' + num;
        }

        function setupAnswers() {
            $scope.test.answers = {};
            $scope.test.quizs.forEach(function (quiz, i) {
                if (quiz.type != 'Text') {
                    $scope.test.answers[quiz._id] = [];
                }
            });
        }

        function init() {
            var x = setTimeout(function () { }, 0);
            for (var i = 0; i < x; i++) {
                clearTimeout(i);
            }
            Test.getByTitle(titleUrl, function (err, docs) {
                if (err) {
                    console.log(err);
                    $scope.show.loading = false;
                    $scope.show.alert = true;
                } else {
                    $scope.test = docs;
                    $scope.test.startTime = new Date().getTime();
                    groupQuiz();
                    setupAnswers();
                    $scope.fShowQuiz();
                    time = $scope.test.duration * 60;
                    $(document).ready(sl);
                    countDo();
                    $scope.show.loading = false;
                    $scope.show.doingTest = true;
                }
            });
        }

        function sl() {
            if ($('#quiz-container').children().length > 1) {
                addStimulus();
                $('.single-item').slick({
                    dots: true
                });
            } else {
                setTimeout(sl, 10);
            }
        }

        Auth.isLoggedIn(function (isLoggedIn) {
            if (isLoggedIn) {
                init();
            } else {
                $window.location.href = '#/';
            }
        });

        $scope.fFocus = function (order) {
            var eles = $('.quiz' + order);
            if ($scope.show.showAll) {
                eles.find('input').focus();
            } else {
                if (focusNow) focusNow.hide();
                eles.show();
                focusNow = eles;
            }
        }

        Test.getUserResult(function (err, doc) {
            //console.log(err || doc);
        });
    });
