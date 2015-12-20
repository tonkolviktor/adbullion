'use strict';

angular.module('myApp.order', ['ngRoute', 'myApp.order.directives', 'myApp.order.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/order', {
            templateUrl: 'order/partials/order.html',
            controller: 'OrderCtrl'
        });
    }])

    .controller('OrderCtrl', ['$scope', 'OrderData', '$translate', function ($scope, OrderData, $translate) {
        $scope.resetOrder = function() {
            $scope.order = {selectedProduct: null};
            $scope.total = 0;
            $scope.shipping = 4.95;
            $scope.message = null;
            $scope.orderform.$setPristine();
            $scope.orderform.$setUntouched();
        };
        $scope.resetOrder();

        var createOrder = function () {
            var orderToSend = angular.copy($scope.order);
            delete orderToSend.selectedProduct;
            orderToSend.product = $scope.order.selectedProduct.price;
            orderToSend.shipping = $scope.shipping;
            orderToSend.total = $scope.total;

            return orderToSend;
        };

        $scope.submitOrder = function () {
            $scope.orderform.$setSubmitted();
            if ($scope.orderform.$invalid) {
                return;
            }

            OrderData.add(createOrder(), function (successResponse) {
                $scope.message = {};
                if (successResponse.data.orderId) {
                    $scope.message.type = 'SUCCESS';
                    $scope.message.message = $translate.instant('ORDER_SUBMITTED', {orderId: successResponse.data.orderId});
                } else {
                    $scope.message.type = 'ERROR';
                    $scope.message.message = successResponse.data.message;
                }
            }, function (errorResponse) {
                $scope.message = {
                    type: 'ERROR',
                    message: $translate.instant('HTTP_ERROR')
                };
            });
        };
    }]);