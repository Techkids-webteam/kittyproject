angular.module('quizServices', [])

    .factory('Quiz', function ($http, $location) {

        var quizFactory = {};

        quizFactory.get = function (skip, cb) {
            $http.get('http://techkids.vn:3000/api/admin/quiz')
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null, res.result);
                    } else {
                        cb(res.err || res.error || new Error(res.mess || res.message || 'Something went wrong!'));
                    }
                }, function (res) {
                    cb((res = res.data || res).err || res.error || new Error(res.msg || 'Something went wrong!'));
                }
                );
        }

        quizFactory.getType = function (cb) {
            $http.get('http://techkids.vn:3000/api/admin/quiz/type')
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null, res.result);
                    } else {
                        cb(res.err || res.error || new Error(res.mess || res.message || 'Something went wrong!'));
                    }
                }, function (res) {
                    cb((res = res.data || res).err || res.error || new Error(res.mess || res.message || 'Something went wrong!'));
                });
        }

        quizFactory.add = function (data, cb) {
            $http.post('http://techkids.vn:3000/api/admin/quiz', data)
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null);
                    } else {
                        cb(res.err || new Error(res.msg || 'Something went wrong!'));
                    }
                }, function (res) {
                    cb((res = res.data || res).err || new Error(res.msg || 'Something went wrong!'));
                });
        };

        quizFactory.remove = function (data, cb) {
            $http.delete('http://techkids.vn:3000/api/admin/quiz', {data: data})
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null);
                    } else {
                        cb(res.err || new Error(res.msg || 'Something went wrong!'));
                    }
                }, function (res) {
                    cb((res = res.data || res).err || new Error(res.msg || 'Something went wrong!'));
                });
        };

        quizFactory.update = function (data, cb) {
            $http.put('http://techkids.vn:3000/api/admin/quiz', data)
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null);
                    } else {
                        cb(res.err || new Error(res.msg || 'Something went wrong!'));
                    }
                }, function (res) {
                    cb((res = res.data || res).err || new Error(res.msg || 'Something went wrong!'));
                });
        };

        return quizFactory;

    })
    .factory('QuizBox', function () {
        var quizBox = [];
        var quizType = [];

        var QuizBoxFactory = {};

        QuizBoxFactory.indexOf = function (quiz) {
            if (quizBox instanceof Array && quiz) {
                for (var i = 0; i < quizBox.length; i++) {
                    if (quizBox[i]._id.toString() == quiz._id.toString()) {
                        return i;
                    }
                }
            };
            return -1;
        }

        QuizBoxFactory.add = function (quiz) {
            if (this.indexOf(quiz) < 0) {
                quizBox.push(quiz);
                if (quizType.indexOf(quiz.type) < 0) {
                    quizType.push(quiz.type);
                }
            }
        }

        QuizBoxFactory.get = function () {
            return quizBox;
        }

        QuizBoxFactory.ids = function () {
            var ids = [];
            quizBox.forEach(function (quiz, i) {
                ids.push(quiz._id);
            });
            return ids;
        }

        QuizBoxFactory.length = function () {
            return quizBox.length;
        }

        QuizBoxFactory.total = function () {
            var total = 0;
            quizBox.forEach(function (quiz, i) {
                try {
                    total += quiz.subQuizs.length;
                } catch (err) { }
            });
            return total;
        }

        QuizBoxFactory.type = function () {
            return quizType;
        }

        QuizBoxFactory.include = function (quiz) {
            return this.indexOf(quiz) >= 0;
        }

        QuizBoxFactory.remove = function (quiz) {
            if (quiz) {
                var type = quiz ? quiz.type : null;
                if ((quiz = quizBox.indexOf(quiz)) >= 0) {
                    quizBox.splice(quiz, 1);
                    for (var i = 0; i < quizBox.length; i++) {
                        if (quizBox[i].type == type) {
                            break;
                        }
                        if (i == quizBox.length - 1) {
                            quizType.splice(quizType.indexOf(type), 1);
                        }
                    }
                    return true;
                }
            }
            return false;
        }

        QuizBoxFactory.clear = function () {
            quizBox.splice(0);
        }
        return QuizBoxFactory;
    })
