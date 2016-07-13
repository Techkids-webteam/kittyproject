angular.module('routerApp', ['companyCtrl', 'companyService'])
    //create the controllers
    // this will be the controller for the entire site
    .controller('mainController', function() {
        var vm = this;
        //create a bigMessage variable to display in our views
        vm.bigMessage = 'A smooth sea never made a skilled sailor.';
    });
