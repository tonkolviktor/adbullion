'use strict';

describe('myApp.order module', function () {

    beforeEach(module('myApp.order'));

    describe('order controller', function () {

        it('should be constructed', inject(function ($controller) {
            //spec body
            var orderCtrl = $controller('OrderCtrl');
            expect(orderCtrl).toBeDefined();
        }));

    });
});