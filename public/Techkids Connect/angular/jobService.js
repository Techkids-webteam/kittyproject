angular.module('companyService', []) // ten duoc dat trong app.routes.js
    .factory('Company', function ($http) {
        var companyFactory = {};
        //get all jobs
        companyFactory.all = function () {
            return $http.get('http://125.212.233.51:2407/api/connect/company/');
        };

        // create a job
        companyFactory.create = function (companyData) {
            return $http.post('http://125.212.233.51:2407/api/connect/post-company/', companyData);
        };

        // get single job
        companyFactory.get = function (id) {
            return $http.get('http://125.212.233.51:2407/api/connect/companyById/' + id);
        };

        // update a job
        companyFactory.update = function (id, companyData) {
            return $http.post('http://125.212.233.51:2407/api/connect/edit-company/' + id, companyData);
        };

        // delete a job
        companyFactory.delete = function (id) {
            return $http.post('http://125.212.233.51:2407/api/connect/delete-company/' + id);
        };

        //return our entire companyFactory object
        return companyFactory;
    });
