angular.module('companyService', []) // ten duoc dat trong app.routes.js
    .factory('Company', function ($http) {
        var companyFactory = {};
        //get all jobs
        companyFactory.all = function () {
            return $http.get('http://125.212.233.51:2407/api/connect/company/');
        };
      }
