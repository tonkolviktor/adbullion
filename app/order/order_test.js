'use strict';

describe('myApp.order module', function () {

    beforeEach(function() {
        module('myApp.order');
    });

    describe('order controller', function () {
        var orderCtrl, $rootScope, orderDataMock;
        beforeEach(function() {
            module(function ($provide) {
                orderDataMock = {called: 0};
                orderDataMock.add = function (data, callback) {
                    this.called++;
                };
                $provide.value('OrderData', orderDataMock);
                $provide.value('GeneralData', {});
            });
            inject(function ($controller, _$rootScope_) {
                $rootScope = _$rootScope_;
                orderCtrl = $controller('OrderCtrl', {
                    $scope: $rootScope
                });
            });
        });

        it('should be constructed', function() {
            expect(orderCtrl).toBeDefined();
        });
        it('should be initialise order', function() {
            expect($rootScope.order).toBeDefined();
            expect($rootScope.order.selectedProduct).toBeNull();
            expect($rootScope.order.country).toBeNull();
            expect($rootScope.order.total).toBe(0);
        });
        it('should not call post with invalid form', function() {
            $rootScope.orderform = {$invalid: true, $setSubmitted: function(){}};
            $rootScope.submitOrder();
            expect(orderDataMock.called).toBe(0);
        });
        it('should call post with valid form', function() {
            $rootScope.order.selectedProduct = {price: 5};
            $rootScope.order.country = {price: 5, country: 'US'};
            $rootScope.orderform = {$invalid: false, $setSubmitted: function(){}};
            $rootScope.submitOrder();
            expect(orderDataMock.called).toBe(1);
        });

    });
});