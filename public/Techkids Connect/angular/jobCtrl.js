angular.module('companyCtrl', ['companyService'])
    .controller('companyController', function (Company) {
        var monthDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        var vm = this;
        vm.processing = true;
        Company.all()
            .success(function (data) {
                vm.processing = false;
                vm.companies = data.company;
                vm.viewby = 10; //number of jobs to show in one page by default
                vm.totalItems = vm.companies.length;
                vm.currentPage = 1;
                vm.itemsPerPage = vm.viewby;
                vm.maxSize = 5; //Number of pager buttons to show

                //set page
                vm.setPage = function (pageNo) {
                    vm.currentPage = pageNo;
                };

                //just appear on console
                vm.pageChanged = function () {
                    console.log('Page changed to: ' + vm.currentPage);
                };

                //set job per page
                vm.setItemsPerPage = function (num) {
                    vm.itemsPerPage = num;
                    vm.currentPage = 1; //reset to first page
                };
            });

        vm.deleteCompany = function (id) {
            if (confirm("Delete this job?")) { //appear a pop up
                vm.processing = true;
                Company.delete(id)
                    .success(function (data) {
                        Company.all()
                            .success(function (data) {
                                vm.processing = false;
                                vm.companies = data.company;
                            });

                    });
            }

        };
    })
    .filter('array', function() {
    return function(arrayLength) {
        arrayLength = Math.ceil(arrayLength);
        var arr = new Array(arrayLength), i = 0;
        for (; i < arrayLength; i++) {
            arr[i] = i;
        }
        return arr;
    }})
    .controller('companyCreateController', function (Company, $location) {
        var vm = this;
        vm.type = 'create';
        vm.selectedField = {};
        vm.companyData = {
            fields: []
        };

        vm.saveCompany = function () {
            vm.processing = true;
            vm.message = 'Connect one more kid';
            Company.create(vm.companyData)
                .success(function (data) {
                    vm.processing = false;
                    vm.companyData = {};
                    //                                        vm.message = data.message;
                    $location.path("/jobs"); // href to /jobs when done
                });
        };
    })
    .controller('companyEditController', function ($routeParams, Company, $location) {
        var vm = this;
        vm.type = 'edit';
        vm.companyData = {
            fields: []
        };
        Company.get($routeParams.company_id)
            .success(function (res) {
                vm.companyData = res.data;
            });
        vm.saveCompany = function () {
            vm.processing = true;
            vm.message = '';
            Company.update($routeParams.company_id, vm.companyData)
                .success(function (data) {
                    vm.processing = false;
                    vm.companyData = {};
                    //                                        vm.message = data.message;
                    $location.path("/jobs"); // href to /jobs when done
                });
        };
    })

.controller('PaginationCompanyCtrl', function (Company) {
        var vm = this;
        Company.all()
            .success(function (data) {
                vm.processing = false;
                vm.companies = data.companies;
                vm.viewby = 10;
                // vm.totalItems = vm.companies.length;
                vm.currentPage = 4;
                vm.itemsPerPage = vm.viewby;
                vm.maxSize = 5; //Number of pager buttons to show

                vm.setPage = function (pageNo) {
                    vm.currentPage = pageNo;
                };

                vm.pageChanged = function () {
                    console.log('Page changed to: ' + vm.currentPage);
                };

                vm.setItemsPerPage = function (num) {
                    vm.itemsPerPage = num;
                    vm.currentPage = 1; //reset to first paghe
                };
                for (var i = 1; i < vm.companies.length; i++) {
                    vm.companies[i].index = i;
                    console.log(vm.companies[i].index);
                }
            });
    })
    .controller('PaginationDemoCtrl', function () {
        var vm = this;
        vm.data = [{
            "name": "Abraham",
            "id": "S7V 0W9"
        }, {
            "name": "Eleanor",
            "id": "K7K 9P4"
        }, {
            "name": "Martina",
            "id": "V0Z 5Q7"
        }, {
            "name": "Kelsie",
            "id": "R7N 7P2"
        }, {
            "name": "Hedy",
            "id": "B7E 7F2"
        }, {
            "name": "Hakeem",
            "id": "S5P 3P6"
        }];
        vm.viewby = 10;
        // vm.totalItems = vm.data.length;
        vm.currentPage = 4;
        vm.itemsPerPage = vm.viewby;
        vm.maxSize = 5; //Number of pager buttons to show

        vm.setPage = function (pageNo) {
            vm.currentPage = pageNo;
        };

        vm.pageChanged = function () {
            console.log('Page changed to: ' + vm.currentPage);
        };

        vm.setItemsPerPage = function (num) {
            vm.itemsPerPage = num;
            vm.currentPage = 1; //reset to first paghe
        };
    });
