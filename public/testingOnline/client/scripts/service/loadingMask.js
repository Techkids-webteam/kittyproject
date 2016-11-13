angular.module('loadingMaskServices', [])

    .factory('LoadingMask', function () {
        var loadingMaskFactory = {};
        loadingMaskFactory.disable = function (element) {
            try {
                element.prop("disabled", true);
                element.text('');
                element.empty();
                element.append($("<i class='fa fa-spinner' aria-hidden='true'>")); 
            }catch (err) { }
        }

        loadingMaskFactory.enable = function (element, text) {
            try {
                element.empty();
                element.text(text);
                element.prop("disabled", false);
            } catch (err) { }
        }

        return loadingMaskFactory;

    })