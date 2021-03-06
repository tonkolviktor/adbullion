'use strict';

angular.module('myApp.i18n', [])
.constant('appTranslations', {
    EN: {
        'NAME': "Full name",
        'EMAIL': "Email",
        'PHONE': 'Phone',
        'ADDRESS': 'Address',
        'CITY': 'City',
        'STATE': 'State',
        'COUNTY': 'Country',
        'TERMS_AND_CONDITIONS':'Terms and conditions',
        'YOUR_ORDER':'Your Order',
        'PRODUCT':'Product',
        'SHIPPING':'Shipping',
        'TOTAL':'Total',
        'SUBMIT':'Submit',
        'ERROR_REQUIRED':'This field is required!',
        'ERROR_EMAIL':'Invalid email address!',
        'ERROR_MINMAX':'Number must be between 0 and 99999999999999999999!',
        'ORDER_SUBMITTED':'Order successfully submitted. Order id: {{orderId}}',
        'HTTP_ERROR':'Communication error occurred during form submission',
        'NEW_ORDER':'New order',
        'SHIPPING_TO':'Shipping to {{country}}',


        'LAST':'last'
    },
    ES: {}
}
);
