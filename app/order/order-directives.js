'use strict';

angular.module('myApp.order.directives', [])

    .directive('orderForm', [function() {
        return {
            templateUrl: 'order/partials/order-form.html'
        };
    }])
    .directive('termsAndConditions', [function() {
        return {
            templateUrl: 'order/partials/terms-and-conditions.html'
        };
    }])


;
