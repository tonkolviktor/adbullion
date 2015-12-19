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
    .directive('orderSummary', [function() {

        return {
            restrict: 'E',
            templateUrl: 'order/partials/order-summary.html',
            controller: function($scope, $element){
                $scope.products = [
                    {name: 'Product 1', price: '50'},
                    {name: 'Shipping', price: '4.95'}
                ];
                $scope.total = 54.95;
            }
        };
    }])


;
