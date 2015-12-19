'use strict';

angular.module('myApp.order', ['ngRoute', 'myApp.order.directives'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/order', {
            templateUrl: 'order/partials/order.html',
            controller: 'OrderCtrl'
        });
    }])

    .controller('OrderCtrl', [function () {

    }]);