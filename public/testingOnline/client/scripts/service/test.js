angular.module('testServices', [])

    .factory('Test', function ($http, $q, AuthToken, $location) {

        var testFactory = {};

        testFactory.getUserValidTest = function (cb) {
            return $http.get('http://techkids.vn:3000/api/user/available')
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null, res.result);
                    } else {
                        cb(res.err || new Error('Something went wrong!'));
                    }
                },
                function (res) {
                    cb((res = res.data).err || new Error('Something went wrong!') );
                });
        };

        testFactory.submitTest = function (testTitle, test, cb) {
            return $http.post('http://techkids.vn:3000/api/user/test/match/' + testTitle, test)
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null, res.result);
                    } else {
                        cb(res.err || new Error('Something went wrong!'));
                    }
                },
                function (res) {
                    cb((res = res.data || {}).err || new Error('Something went wrong!'));
                });
        };

        testFactory.getUserResult = function (cb) {
            return $http.get('http://techkids.vn:3000/api/user/result')
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null, res.result);
                    } else {
                        cb(res.err || new Error('Something went wrong!'));
                    }
                },
                function (res) {
                    cb((res = res.data || {}).err || new Error('Something went wrong!'));
                });
        };

        testFactory.get = function (skip, cb) {
            return $http.get('http://techkids.vn:3000/api/user/test')
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null, res.result);
                    } else {
                        cb(res.err || new Error('Something went wrong!'));
                    }
                },
                function (res) {
                    cb((res = res.data || {}).err || new Error('Something went wrong!'));
                });
        };

        testFactory.getTitle = function (cb) {
            return $http.get('http://techkids.vn:3000/api/admin/test/title')
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

        testFactory.getByTitle = function (testTitle, cb) {
            if (testTitle)
                return $http.get('http://techkids.vn:3000/api/user/test/' + testTitle)
                    .then(function (res) {
                        if ((res = res.data).code) {
                            cb(null, res.result);
                        } else {
                            cb(res.err || new Error('Something went wrong!'));
                        }
                    },
                    function (res) {
                        cb((res = res.data || {}).err || new Error('Something went wrong!'));
                    });
            else cb(new Error('Missing test title'));
        };

        testFactory.getSlick = function (cb) {
            var linkSrc = "http://techkids.vn:3000/public/images/";
            cb(null, [
                { name: "Xêkô", slogan: "'Vì một thế giới hết sida! Đừng như tôi!'", linkImg: linkSrc +  "xeko.jpg" },
                { name: "Nguyễn Thanh Tùng", slogan: "", linkImg: linkSrc + "tunggia.jpg" },
                { name: "Tôn Hồng Đức", slogan: "Chúc các bạn may mắn ..(\"Error: Unable to load message.., Check more On the Submit Button\")", linkImg: linkSrc + "vat.jpg" }
            ]);
        }

        testFactory.add = function (cb, data) {
            return $http.post('http://techkids.vn:3000/api/admin/test', data)
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null);
                    } else {
                        cb(res.err || new Error('Something went wrong!'));
                    }
                },
                function (res) {
                    cb((res = res.data || {}).err || new Error('Something went wrong!'));
                });
        }

        testFactory.find = function (content, cb) {
            $http.get('http://techkids.vn:3000/user/test/')
                .then(function (res) {

                }, function (res) {

                });
        }
        return testFactory;

    })
