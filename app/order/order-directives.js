'use strict';

angular.module('myApp.order.directives', [])

    .directive('orderForm', ['GeneralData', function (GeneralData) {
        return {
            templateUrl: 'order/partials/order-form.html',
            controller: function ($scope, $element) {
                $scope.availableCountries = [];

                GeneralData.listCountries({}, function(response) {
                    $scope.availableCountries = response;
                });
            }
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
    .directive('orderSummary', ['$translate', function ($translate) {

        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'order/partials/order-summary.html',
            controller: function ($scope, $element) {
                var rebuildPriceList = function() {
                    $scope.products = [];
                    var total = 0;

                    if($scope.order.selectedProduct) {
                        var product = {
                            id: 'product_' + $scope.order.selectedProduct.id,
                            name: $scope.order.selectedProduct.product,
                            price: $scope.order.selectedProduct.price,
                        };
                        $scope.products.push(product);
                        total += product.price;
                    }

                    if($scope.order.country) {
                        var shipping = {
                            id: 'shipping_' +$scope.order.id,
                            name: $translate.instant('SHIPPING_TO', {country: $scope.order.country.country}),
                            price: $scope.order.country.price
                        }
                        $scope.products.push(shipping);
                        total += shipping.price;
                    }

                    $scope.order.total = total;
                };
                rebuildPriceList();
                $scope.$watch('order.selectedProduct', function(newVal, oldVal) {
                    rebuildPriceList();
                });
                $scope.$watch('order.country', function(newVal, oldVal) {
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
                $scope.possibleProducts = [];
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
            }
        };
    }])


;
