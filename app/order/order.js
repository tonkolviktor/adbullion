'use strict';

angular.module('myApp.order', ['ngRoute', 'myApp.order.directives', 'myApp.order.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/order', {
            templateUrl: 'order/partials/order.html',
            controller: 'OrderCtrl'
        });
    }])

    .controller('OrderCtrl', ['$scope', 'OrderData', '$translate', 'GeneralData', function ($scope, OrderData, $translate, GeneralData) {
        $scope.resetOrder = function() {
            $scope.order = {selectedProduct: null, country: null, total: 0};
            $scope.message = null;
            if($scope.orderform) {
                $scope.orderform.$setPristine();
                $scope.orderform.$setUntouched();
            }
        };
        $scope.resetOrder();

        var createOrder = function () {
            var orderToSend = angular.copy($scope.order);
            delete orderToSend.selectedProduct;
            delete orderToSend.country;
            orderToSend.product = $scope.order.selectedProduct.price;
            orderToSend.shipping = $scope.order.country.price;
            orderToSend.country = $scope.order.country.country;

            return orderToSend;
        };

        $scope.submitOrder = function () {
            $scope.orderform.$setSubmitted();
            if ($scope.orderform.$invalid) {
                return;
            }
            var orderToSend = createOrder();
            OrderData.add(orderToSend, function (successResponse) {
                $scope.message = {};
                if (successResponse.data.orderId) {
                    $scope.message.type = 'SUCCESS';
                    $scope.message.message = $translate.instant('ORDER_SUBMITTED', {orderId: successResponse.data.orderId});
                    orderToSend.orderId = successResponse.data.orderId;
                    GeneralData.addOrder(orderToSend);
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