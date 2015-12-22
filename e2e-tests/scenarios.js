'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

// Slow down protactor to enjoy :)
var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
    var args = arguments;

    // queue 100ms wait
    origFn.call(browser.driver.controlFlow(), function() {
        return protractor.promise.delayed(100);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};
//--------------------------------

describe('my app', function () {


    it('should automatically redirect to /order when location hash/fragment is empty', function () {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/order");
    });


    describe('view1', function () {

        beforeEach(function () {
            browser.get('index.html#/view1');
        });


        it('should render view1 when user navigates to /view1', function () {
            expect(element.all(by.css('[ng-view] p')).first().getText()).
                toMatch(/partial for view 1/);
        });

    });


    describe('view2', function () {

        beforeEach(function () {
            browser.get('index.html#/view2');
        });


        it('should render view2 when user navigates to /view2', function () {
            expect(element.all(by.css('[ng-view] p')).first().getText()).
                toMatch(/partial for view 2/);
        });

    });

    describe('order', function () {

        beforeEach(function () {
            browser.get('index.html#/order');
        });


        it('should render order form when user navigates to /order', function () {
            element.all(by.tagName('input')).then(function(items) {
                expect(items.length).toBe(10);
            });
            element.all(by.tagName('select')).then(function(items) {
                expect(items.length).toBe(1);
            });

            expect(element(by.className('bg-success')).isDisplayed()).toBeFalsy();


            // add form data
            element.all(by.model('order.selectedProduct')).get(0).click();
            element(by.model('order.fullname')).sendKeys('Protactor name');
            element(by.model('order.email')).sendKeys('protactor@gmail.com');
            element(by.model('order.phone')).sendKeys('12345678');
            element(by.model('order.address')).sendKeys('Address');
            element(by.model('order.city')).sendKeys('Citry');
            element(by.model('order.state')).sendKeys('State');
            selectDropdownByNum(element, 2);
            element(by.model('order.acceptedTerms')).click();

            // submit form

            element(by.className('stretchy-wrapper')).click();
            browser.sleep(1000);
            expect(element(by.className('bg-success')).isDisplayed()).toBeTruthy();
        });

    });

    var selectDropdownByNum = function ( element, optionNum ) {
        if (optionNum){
            var options = element.all(by.tagName('option'))
                .then(function(options){
                    options[optionNum].click();
                });
        }
    };
});
