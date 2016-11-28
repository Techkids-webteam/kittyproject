'use strict';

angular.module('quizApp')
    .controller('AdminQuizCtrl', function ($scope, Auth, $http, $location, $window, Quiz, QuizBox, DateTime, LoadingMask) {
        $scope.show = {
            add: false,
            update: false,
            manage: true
        }

        $scope.DateTime = DateTime;

        function init() {
            $scope.function.fLoadQuiz();
        }

        Auth.isAdmin(function (isAdmin) {
            if (isAdmin) {
                init();
            } else {
                $location.path('/');
            }
        });

        $scope.QuizBox = QuizBox;

        $scope.quizType = [
            "Android",
            "IOS",
            "Web"
        ]

        //add
        $scope.quiz = {
            subQuizs: [{
                type: "Choice",
                answers: ["", ""],
                rightAnswer: [],
                checkbox: []
            }]
        }

        //manage
        $scope.quizs = [];

        //update;
        $scope.quizUpdate = {};

        $scope.function = {
            //add
            fAddQuiz: function (quiz) {
                quiz.subQuizs.push({
                    type: "Choice",
                    answers: ["", ""],
                    rightAnswer: [],
                    checkbox: []
                });
            },

            fRemoveQuiz: function (quiz, index) {
                quiz.subQuizs.splice(index, 1);
            },

            fAddAnswer: function (subQuiz) {
                subQuiz.answers.push('');
            },

            fRemoveAnswer: function (subQuiz, index) {
                subQuiz.answers.splice(index, 1);
            },
            fAddType: function () {
                var txt;
                if (txt = $('#txtTypeAdd').val()) {
                    var include = false;
                    $scope.quizType.forEach(function (ele, i) {
                        if (ele.toLowerCase().trim() == txt.toLowerCase().trim()) {
                            txt = ele;
                            include = true;
                        }
                    });
                    if (!include)
                        $scope.quizType.push(txt);
                    if ($scope.show.add) {
                        $scope.quiz.type = txt;
                    }
                    if ($scope.show.update) {
                        $scope.quizUpdate.type = txt;
                    }
                    $('#txtTypeAdd').val('');
                }
            },

            //fTypeChange: function (subQuiz) {
            //    if (subQuiz.type == 'Text') {
            //        subQuiz.rightAnswer.push('');
            //    } else {
            //        subQuiz.rightAnswer.splice(0);
            //    }
            //},

            fSwitchPage: function (page) {
                switch (page) {
                    case "add": {
                        setAllPropFalse($scope.show, 'add');
                        break;
                    }
                    case "manage": {
                        this.fLoadQuiz();
                        setAllPropFalse($scope.show, 'manage');
                        break;
                    }
                    default: {
                        setAllPropFalse($scope.show, 'update');
                    }
                }
            },

            //manage
            fLoadQuiz: function () {
                Quiz.getType(function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        $scope.quizType = docs;
                    }
                });
                Quiz.get(0, function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        $scope.quizs = docs;
                    }
                })
            },

            fAddToQuizBox: function (quiz) {
                QuizBox.add(quiz);
                console.log(QuizBox.length());
            },

            fCreateQuiz: function () {
                var btn = $('#btnCreateQuiz');
                LoadingMask.disable(btn);
                var mess = validate($scope.quiz);
                if (mess) {
                    alert(mess);
                    LoadingMask.enable(btn);
                } else {
                    Quiz.add($scope.quiz, function (err) {
                        if (err) {
                            alert(err);
                        } else {
                            alert('success');
                        }
                        LoadingMask.enable(btn);
                    });
                }
            },

            fDeleteQuiz: function (quiz) {
                Quiz.remove(quiz, function (err) {
                    if (err) {
                        alert(err.mess || err.message || err);
                    } else {
                        alert("Quiz '" + quiz._id + "' has been removed!");
                        $scope.quizs.splice($scope.quizs.indexOf(quiz), 1);
                    }
                });
            },

            fShowUpdate: function (quiz) {
                this.fSwitchPage('update');
                $scope.quizUpdate = JSON.parse(JSON.stringify(quiz));
                $scope.quizUpdate.subQuizs.forEach(function (sq, isq) {
                    if (sq.type.includes('Choice')) {
                        sq.type = 'Choice';
                        sq.checkbox = [];
                        sq.answers.forEach(function (answer, ia) {
                            if (sq.rightAnswer.indexOf(ia) < 0) {
                                sq.checkbox.push(false);
                            } else {
                                sq.checkbox.push(true);
                            }
                        });
                    }
                });
            },

            fUpdateQuiz: function () {
                var mess = validate($scope.quizUpdate);
                if (mess) {
                    alert(mess);
                } else {
                    var cb = function (err) {
                        if (err) {
                            alert(err.mess || err.message || err);
                        } else {
                            this.fSwitchPage('manage');
                            alert("Quiz '" + $scope.quizUpdate._id + "' has been updated!");
                        }
                    }.bind(this);
                    Quiz.update($scope.quizUpdate, cb);
                }
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

        function validate(quiz) {
            try {
                var mess = '';
                if (quiz) {
                    if (!quiz.type) {
                        mess += "-Missing question type.\r\n";
                    }
                    quiz.subQuizs.forEach(function (sq, isq) {
                        if (!sq.stem)
                            mess += '-Missing question at Question ' + (isq + 1) + ".\r\n";
                        if (sq.type != 'Text') {
                            sq.rightAnswer.splice(0);
                            for (var i = 0; i < sq.answers.length; i++) {
                                if (sq.checkbox[i]) {
                                    sq.rightAnswer.push(i);
                                }
                            }
                            if (sq.rightAnswer.length < 1) {
                                mess += "-Each question of the 'Choice' type must have at least 1 correct answer (make it by clicking on checkbox button next to text input)!" + '(Question ' + (isq + 1) + ').\r\n';
                            }
                        } else {
                            if (!sq.rightAnswer[0]) {
                                mess += "-Each question of the 'Text' type must have the correct answer. (Question " + (isq + 1) + ').\r\n';
                            }
                        }
                    });
                }
                return mess;
            } catch (err) {
                return err;
            }
        }
        
    });
