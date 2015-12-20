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
;