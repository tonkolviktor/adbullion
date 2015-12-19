'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'pascalprecht.translate',
    'myApp.i18n',
    'myApp.view1',
    'myApp.view2',
    'myApp.order',
    'myApp.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/order'});
    }])
    .config(['$translateProvider', 'appTranslations', function ($translateProvider, appTranslations) {
        $translateProvider
            .translations('en', appTranslations['EN'])
            .translations('es', appTranslations['ES']);
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
    }])
;
