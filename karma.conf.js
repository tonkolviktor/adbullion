module.exports = function (config) {
    config.set({

        basePath: './',


        files: [
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-resource/angular-resource.min.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-translate/angular-translate.min.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'app/bower_components/angular-sanitize/angular-sanitize.min.js',
            'app/components/**/*.js',
            'app/view*/**/*.js',
            'app/order/**/*.js',
            'app/order/**/*.html'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        preprocessors: {
            "app/order/**/*.html": ["ng-html2js"]
        },

        ngHtml2JsPreprocessor: {
            // If your build process changes the path to your templates,
            // use stripPrefix and prependPrefix to adjust it.
            stripPrefix: "app/",
            prependPrefix: "",

            // the name of the Angular module to create
            moduleName: "order.templates"
        },

    });
};
