# Adbullion WebMaster Quiz

## Getting Started

Install nodejs: https://nodejs.org/en/

Clone this repo
```
git clone https://github.com/tonkolviktor/adbullion
cd adbullion
```

Start the application
```
npm start db_host db_user db_password
```
Now browse to the app at `http://localhost:8080/`.

## Testing

There are two kinds of tests in the application: Unit tests and End to End tests.

### Running Unit Tests

```
npm run test-single-run
```

### End to end testing

```
npm start db_host db_user db_password
```

```
npm run update-webdriver
```

```
npm run protractor
```


## Documentation

The application is based on: https://github.com/angular/angular-seed

I implemented the order module, the nodejs server side component, the unit and the e2e tests.

The following technologies / frameworks were used:

- HTML5
- CSS3
- JavaScript
 - AngularJS
 - JQuery
 - NodeJS (http, mysql, buffet)
 - karma
 - protactor
 - jasmine
 - bower
 - npm
- git
- SQL

The application consists of two main parts: client side (/app directory) and server side (/app-server directory)
The client side was written in AngularJS. The business logic can be found in /app/order/order.js and order-directives.js
The client uses two backend applications: one to create the order OrderData (/app/order/order-services.js),
and GeneralData to access products, customers tables and to insert data into sales table.

The server nodejs application (/app-server/adbullion-server.js) creates a http server which listens on port 8080.
This serves two kinds of requests:
 - client side static files: the content of the /app directory can be accessed
 - API request:
    - GET <host>:8080/api/products product list from database
    - GET <host>:8080/api/customers customers list from database
    - POST <host>:8080/api/newOrder insert the posted (json format) order into sales table

### Directory Layout

```
app-server/             --> all of the source files for the server nodejs application
  sql/create.sql        --> sql script to create sales table
  adbullion-server.js   --> nodejs server app, this will handle database select and insert requests
                            this file also servers the static client html, js, css files
app/                    --> all of the source files for the client application
  app.css               --> default stylesheet
  components/           --> all app specific modules
    i18n/i18n.js        --> internationalization file
  gfx/                  --> images from the psd file
  order/                --> order module source files
    partials/           --> order directive html templates
     order.html         --> order page layout
    order.js            --> order page controller
    order_test.js       --> order page controller unit test
    order-directives.js            --> order directives
    order-directives_test.js       --> order directives unit test
    order-services.js            --> order services to access backend
    order-services_test.js       --> order directives unit test
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```