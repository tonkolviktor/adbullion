'use strict';

angular.module('myApp.order.directives', [])

    .directive('orderForm', [function () {
        return {
            templateUrl: 'order/partials/order-form.html'
        };
    }])
    .directive('termsAndConditions', [function () {
        return {
            templateUrl: 'order/partials/terms-and-conditions.html'
        };
    }])
    .directive('submitCircle', [function () {
        return {
            templateUrl: 'order/partials/submit-circle.html'
        };
    }])
    .directive('message', [function () {
        return {
            templateUrl: 'order/partials/message.html'
        };
    }])
    .directive('orderSummary', [function () {

        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'order/partials/order-summary.html',
            controller: function ($scope, $element) {
                var rebuildPriceList = function() {
                    $scope.products = [];
                    $scope.total = 0;

                    if($scope.order.selectedProduct) {
                        var product = {
                            id: 'product_' + $scope.order.selectedProduct.id,
                            name: $scope.order.selectedProduct.product,
                            price: $scope.order.selectedProduct.price,
                        };
                        $scope.products.push(product);
                        $scope.total += product.price;
                    }

                    if(true) { // TODO country selector
                        $scope.products.push({id: 2, name: 'Shipping', price: '4.95'});
                        $scope.total += 4.95;
                    }
                };
                rebuildPriceList();
                $scope.$watch('order.selectedProduct', function(newVal, oldVal) {
                    rebuildPriceList();
                });
            }
        };
    }])
    .directive('productSelector', ['GeneralData', function (GeneralData) {
        return {
            restrict: 'E',
            templateUrl: 'order/partials/product-selector.html',
            controller: function ($scope, $element) {
                GeneralData.listProducts({}, function(response) {
                    var dbProducts = response;
                    dbProducts.forEach(function(element) {
                        if(element.product.indexOf("Two") === 0) {
                            element.image = "gfx/products/more.png";
                        } else if(element.product.indexOf("Three") === 0) {
                            element.image = "gfx/products/many.png";
                        } else {
                            element.image = "gfx/products/few.png";
                        }

                        $scope.possibleProducts.push(element);
                    });
                });

                $scope.possibleProducts = [];
            }
        };
    }])


;
