'use strict';

angular.module('myApp.order', ['ngRoute', 'myApp.order.directives'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/order', {
            templateUrl: 'order/partials/order.html',
            controller: 'OrderCtrl'
        });
    }])

    .controller('OrderCtrl', ['$scope', function ($scope) {
        $scope.order = {};
        $scope.submitOrder = function () {
            $scope.orderform.$setSubmitted();
            if($scope.orderform.$invalid) {
                return;
            }
            console.log($scope);
            console.log($scope.orderform);
            console.log($scope);
        }
    }]);