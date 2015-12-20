'use strict';

angular.module('myApp.order.services', [])

    .factory("OrderData", ['$http', function ($http) {
        var url = 'http://quiz.adsbullion.com/quiz/quizTestsAddOrder.php';
        return {
            getBaseRequestData: function () {
                return {
                    'user': 'AdBullion',
                    'key': 'NextGeneration'
                };
            },
            add: function (userData, successCallback, errorCallback) {
                var dataToSend = this.getBaseRequestData();
                dataToSend = angular.extend(dataToSend, userData);
                $http({
                    method: 'POST',
                    url: url,
                    data: $.param(dataToSend),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(successCallback, errorCallback);
            }
        }
    }])
    .factory("GeneralData", ['$resource', function ($resource) {
        var url = "http://localhost:3000/";
        return $resource(url, {},
            {
                "listProducts": {method: 'GET', url: url + 'products', isArray: true},
                "listCountries": {method: 'GET', url: url + 'countries', isArray: true},
                "addOrder": {method: 'POST', url: url}
            });
    }])
;