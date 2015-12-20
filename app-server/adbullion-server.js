/* Main */

var DB_HOST = process.env["DB_HOST"];
var DB_USER = process.env["DB_USER"];
var DB_PASSWORD = process.env["DB_PASSWORD"];

var args = process.argv.slice(2);
if (!DB_HOST && !DB_USER && !DB_PASSWORD && args.length < 3) {
    console.log('Missing database parameters! Usage: (npm start | node app-server/adbullion-server.js) db_host db_user db_password');
    process.exit(1);
} else if (args.length >= 3) {
    DB_HOST = args[0];
    DB_USER = args[1];
    DB_PASSWORD = args[2];
}

console.log('Mysql server: ' + DB_USER + '@' + DB_HOST);

var http = require('http');

var buffet = require('buffet')({root: './app'});

http.createServer(getServerConfig()).listen(8080);
console.log('Server running at port 8080...');

/* Methods */
function getServerConfig() {
    return function (req, res) {
        console.log('Receving request: ' + req.url);

        // redirect
        if (req.url == './') {
            res.writeHead(302, {
                'Location': 'index.html'
            });
            return;
        }

        // serve static files
        if (req.url.indexOf('/api/') < 0) {
            buffet(req, res, function () {
                buffet.notFound(req, res);
            });
            return;
        }

        // serve api requests
        serveApiRequests(req, res);
    }
}


function serveApiRequests(req, res) {
    var callback = function (err, result) {
        var responseCode = 200;
        if (err) {
            responseCode: 500;
            result = JSON.stringify(err);
        }
        res.writeHead(responseCode, {
            'Content-Type': 'x-application/json'
        });
        console.log('json:', result);
        res.end(result);
    };

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    var headers = req.headers['access-control-request-headers'];
    if (headers) {
        res.setHeader('Access-Control-Allow-Headers', headers);
    }

    if (req.method === 'OPTIONS') {
        callback(null, '');
    } else if (req.method === 'GET') {
        listData(req.url, callback);
    } else if (req.method === 'POST') {
        saveNewOrder(req, callback);
    } else {
        callback({error: 'Not supported HTTP method: ' + req.method}, null);
    }
}

function saveNewOrder(req, callback) {
    var jsonString = '';

    req.on('data', function (data) {
        if (jsonString.length > 1e6) {
            req.connection.destroy();
        }
        jsonString += data;
    });

    req.on('end', function () {
        var postData = JSON.parse(jsonString);
        insertOrderIntoDatabase(postData, callback);
    });
}

function insertOrderIntoDatabase(postData, callback) {
    var connection = getConnectionToQuizDatabase();
    connection.connect();
    var query = connection.query('INSERT INTO viktorTonkol_sales SET ?', postData, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        connection.end();
        callback(null, '');
    });

}


function listData(url, callback) {
    var connection = getConnectionToGeneralDatabase();
    var json, query = '';

    if (url.indexOf('/products') >= 0) {
        query = 'SELECT * FROM products';
    } else if (url.indexOf('/countries') >= 0) {
        query = 'SELECT * FROM countries';
    } else {
        var err = {message: 'Unknown url: ' + url};
        return callback(err, null);
    }

    connection.connect();
    connection.query(query, function (err, results, fields) {
        if (err) {
            return callback(err, null);
        }
        json = JSON.stringify(results);

        connection.end();
        callback(null, json);
    });
}

function getConnectionToGeneralDatabase() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: 'quiz_general'
    });

    return connection;
}

function getConnectionToQuizDatabase() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: 'QuizTest'
    });

    return connection;
}

;