'use strict';

describe('myApp.order.directives module', function () {

    beforeEach(function () {
        module('myApp.order');
        module('order.templates');
    });

    describe('simple html directives', function () {
        it('should print a checkbox and terms and conditions', function () {
            inject(function ($compile, $rootScope) {
                var element = $compile('<terms-and-conditions></terms-and-conditions>')($rootScope);
                $rootScope.$digest();
                expect(element.find("input")[0]).toBeDefined()
                expect(element.find("input")[0].name).toEqual('acceptedTerms');
                expect(element.find("p")[0]).toBeDefined();
                expect(element.find("p")[0].innerHTML).toBeDefined();
            });
        });
        it('should print a circle', function () {
            inject(function ($compile, $rootScope) {
                var element = $compile('<submit-circle></submit-circle>')($rootScope);
                $rootScope.$digest();
                expect(element.find(".stretchy-wrapper")[0]).toBeDefined()
                expect(element.find(".submit-circle")[0]).toBeDefined()
                expect(element.find(".circle-text")[0]).toBeDefined()
            });
        });
        it('should print a two messages', function () {
            inject(function ($compile, $rootScope) {
                var element = $compile('<message></message>')($rootScope);
                $rootScope.$digest();
                expect(element.find("div").length).toBe(2)
            });
        });
    });


    describe('order form directive', function () {
        it('should contain a form with 6 input and one select with US option', function () {
            module(function ($provide) {
                var generalDataMock = {};
                generalDataMock.listCountries = function (data, callback) {
                    callback([{id: 1, country: 'US', price: 5}]);
                };
                $provide.value('GeneralData', generalDataMock);
            });
            inject(function ($compile, $rootScope) {
                var element = $compile('<order-form></order-form>')($rootScope);
                expect($rootScope.availableCountries).toBeUndefined();
                $rootScope.$digest();
                expect($rootScope.availableCountries).toBeDefined();
                expect($rootScope.availableCountries.length).toBe(1);
                expect($rootScope.availableCountries[0].price).toBe(5);
                expect(element.find("input").length).toBe(6);
                expect(element.find("select").length).toBe(1);
                expect(element.find("select")[0][1].text).toBe('US');
            });
        });
    });

    describe('product selector directive', function () {
        it('should print two input radios', function () {
            module(function ($provide) {
                var generalDataMock = {};
                generalDataMock.listProducts = function (data, callback) {
                    callback([{id: 1, product: 'Product1', price: 5},
                        {id: 2, product: 'Product2', price: 10}]);
                };
                $provide.value('GeneralData', generalDataMock);
            });
            inject(function ($compile, $rootScope) {
                var element = $compile('<product-selector></product-selector>')($rootScope);
                expect($rootScope.possibleProducts).toBeUndefined();
                $rootScope.$digest();
                expect($rootScope.possibleProducts).toBeDefined();
                expect($rootScope.possibleProducts.length).toBe(2);
                expect(element.find("input").length).toBe(2);
            });
        });
    });

    describe('order summary directive', function () {
        var element, $rootScope;
        beforeEach(function() {
            module(function ($provide) {
            });
            inject(function ($compile, _$rootScope_) {
                $rootScope = _$rootScope_;
                $rootScope.order = {selectedProduct: null};
                element = $compile('<order-summary></order-summary>')($rootScope);
                $rootScope.$digest();
            });
        })
        it('should contain a table', function () {
            expect(element.find("table").length).toBe(1);
            expect(element.find("tr").length).toBe(1);
        });
        it('should print product', function () {
            $rootScope.order.selectedProduct = {id: 1, product: 'Product', price: 5};
            $rootScope.$digest();
            expect(element.find("tr").length).toBe(2);
        });
        it('should print shipping', function () {
            $rootScope.order.country = {id: 1, country: 'US', price: 5};
            $rootScope.$digest();
            expect(element.find("tr").length).toBe(2);
        });
        it('should calculate total', function () {
            $rootScope.order.selectedProduct = {id: 1, product: 'Product', price: 5};
            $rootScope.order.country = {id: 1, country: 'US', price: 5};
            expect($rootScope.order.total).toBe(0);
            $rootScope.$digest();
            expect($rootScope.order.total).toBe(10);
        });
    });
});