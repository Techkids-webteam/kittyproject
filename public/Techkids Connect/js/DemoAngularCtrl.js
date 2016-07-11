angular.module('companyCtrl', ['companyService'])
    .controller('companyController', function (Company) {
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
