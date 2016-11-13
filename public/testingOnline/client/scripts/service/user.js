angular.module('authService', [])

    .factory('Auth', function ($http, $q, AuthToken, $window, $rootScope) {

        // create auth factory object
        var authFactory = {};
        // log a user in
        authFactory.login = function (data, callback) {

            // return the promise object and its data
            return $http.post('http://techkids.vn:3000/api/signin', {data: data, cache: false})
                .success(function (res) {
                    if (res.code) {
                        AuthToken.setToken(res.result.access_token, res.result.user);
                        callback(null);
                    } else {
                        callback(res.err || res.error || new Error(res.mess || res.message || 'Something went wrong!'));
                    }
                });
        };

        // log a user out by clearin g the token
        authFactory.logout = function () {
            // clear the token
            AuthToken.setToken();
        };

        authFactory.register = function (data, cb) {
            console.log(data);
            if (data.name && data.username && data.email && data.password && data.confirm
                && (data.phone = parseInt(data.phone)) && data.DOB) {
                if (data.password == data.confirm) {
                    $http.post('http://techkids.vn:3000/api/signup', data)
                        .success(function (res) {
                            console.log(res);
                            if (res.code) {
                                cb(null);
                            } else {
                                cb(res.err);
                            }
                        }).error(function (res) {
                            console.log(res);
                        });
                } else {
                    cb(new Error('Confirm wrong password!'));
                }
            } else {
                cb(new Error('Please complete all fields!'));
            }
        }

        function validate(cb) {
            var message;
            //var name = $("#name").val() || (message = 'Missing Name!');
            //var email = $("#email").val() || (message = 'Missing email!');
            //var username = $("#username").val() || (message = 'Missing username!');
            //var password = $("#password").val() || (message = 'Missing password!');
            //var confirm = !($("#confirm").val() == password) ?  || (message = 'Missing username!');
        }

        // check if a user is logged in
        // checks if there is a local token
        authFactory.isLoggedIn = function (cb) {
            if (AuthToken.getToken()) {
                authFactory.checkToken(AuthToken.getToken(), function (err, user) {
                    if (err) {
                        AuthToken.setToken();
                        cb(false);
                    } else {
                        AuthToken.setToken(AuthToken.getToken(), user);
                        cb(true);
                    }
                });
            }
            else
                cb(false);
        };

        authFactory.isAdmin = function (cb) {
            if (AuthToken.getToken()) {
                authFactory.checkToken(AuthToken.getToken(), function (err, user) {
                    if (err) {
                        AuthToken.setToken();
                        cb(false);
                    } else {
                        AuthToken.setToken(AuthToken.getToken(), user);
                        if (user.role == 'admin') {
                            cb(true);
                        } else {
                            cb(false);
                        }
                    }
                });
            }
            else
                cb(false);
        };

        authFactory.checkToken = function (token, cb) {
            $http.get('http://techkids.vn:3000/api/token/check/' + token)
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null, res.result);
                    } else {
                        cb(new Error('Something when wrong!'));
                    }
                }, function (res) {
                    cb(res.err || new Error('Invalid Token!'));
                });
        }

        // get the logged in user
        /*
                authFactory.getUser = function() {
                    if (AuthToken.getToken())
                        return $http.get('/api/me', { cache: true });
                    else
                        return $q.reject({ message: 'User has no token.' });
                };
        */

        // return auth factory object
        return authFactory;

    })

    // ===================================================
    // factory for handling tokens
    // inject $window to store token client-side
    // ===================================================
    .factory('AuthToken', function ($window, $rootScope) {

        var authTokenFactory = {};

        // get the token out of local storage
        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        // function to set token or clear token
        // if a token is passed, set the token
        // if there is no token, clear it from local storage
        authTokenFactory.setToken = function (token, user) {
            if (token) {
                $window.localStorage.setItem('token', token);
                user.logOut = function () {
                    $window.localStorage.removeItem('token');
                    $rootScope.user = undefined;
                    $window.location.href = '#/';
                }
                $rootScope.user = user;
            }
            else {
                $window.localStorage.removeItem('token');
                $rootScope = $rootScope.$new(true);
                $scope = $scope.$new(true);
            }
        };

        return authTokenFactory;

    })

    // ===================================================
    // application configuration to integrate token into requests
    // ===================================================
    .factory('AuthInterceptor', function ($q, $location, AuthToken) {

        var interceptorFactory = {};

        interceptorFactory.request = function (config) {
            // don't modify weather api headers
            var token = AuthToken.getToken();
            if (token) {
                config.headers['Authorization'] = "access_token " + token;
            }
            return config;
        };

        // happens on response errors
        interceptorFactory.responseError = function (response) {
            if (response.status == 403) {
                AuthToken.setToken();
                $location.path('/');
            }
            return $q.reject(response);
        };

        return interceptorFactory;

    })

    .factory('User', function ($http) {
        var userFactory = {};
        userFactory.get = function (skip, cb) {
            skip = parseInt(skip) || 0;
            $http.get('http://techkids.vn:3000/api/admin/user/find/' + skip)
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null, res.result);
                    } else {
                        cb(res.err || res.error || new Error(res.message || 'Something went wrong!'));
                    }
                }, function (res) {
                    cb((res = res.data).err || res.error || new Error(res.message || 'Something went wrong!'));
                });
        }

        userFactory.openTestForUser = function (data, cb) {
            $http.post('http://techkids.vn:3000/api/admin/user/open', data)
                .then(function (res) {
                    if ((res = res.data).code) {
                        cb(null, res.result);
                    } else {
                        cb(res.err || res.error || new Error(res.message || 'Something went wrong!'));
                    }
                }, function (res) {
                    cb((res = res.data).err || res.error || new Error(res.message || 'Something went wrong!'));
                });
        }
        return userFactory;
    });
