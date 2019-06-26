//const base64 = require('base-64');
//const axios = require('axios');

const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const PORT = 4000;
const path = require('path');
const {
    Secret
} = require('./_server/secret/secret');

// for gruveo
const crypto = require('crypto');
const {
    Base64Encode
} = require('base64-stream');


const {
    initializeAllRoute
} = require('./_server/api/_route.js');
const isProd = (process.env.NODE_ENV === "production");

require('./_helper/lib-helper');

var root = (isProd) ? "/cf" : "";
//var root = "";
if (isProd) {
    console.log = function (mes) {
        return;
    };
}
//Use Career Fair Schema
const schemaCF = require('./_server/schema/_schema_cf.js');

// body parser used in post argument
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies


//allow CORS
if (!isProd) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}

// intercept to serve compress file
// this has to put before Express Middleware for serving static files 
/* // deprecated -- in nginx, gzip serve tru nginx 
// no need for this
const publicRoot = (isProd) ? "" : "public";
const hasGz = [
    "/asset/js/main.bundle.js"
    //, "/asset/js/vendors.bundle.js"
    //, "/asset/css/main.bundle.css"
];

app.get(root + '/asset/*', function (req, res, next) {
    //strip version query
    if (req.url.indexOf("?v=") >= 0) {
        var urlArr = req.url.split("?v=");
        req.url = urlArr[0];
        var version = urlArr[1];
    }

    if (hasGz.indexOf(req.url) >= 0) {
        req.url = req.url + '.gz' + "?v=" + version;
        console.log(req.url);
        res.set('Content-Encoding', 'gzip');
    }
    next();
});
*/

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Graphql route
app.use(root + '/graphql', expressGraphQL({
    schema: schemaCF,
    graphiql: (process.env.NODE_ENV === "production") ? false : true //set able to use the graphQL web IDE to true
}));

initializeAllRoute(app, root);

const {
    template
} = require('./_server/html/template.js');

app.get(root, function (req, res, next) {
    //console.log("root");
    template("Test");

    res.sendFile(__dirname + '/public/index.html');
});

app.get('*', function (req, res, next) {
    res.send(template(req.url));
    //res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log("React, Redux and GraphQL Server is now running on port " + PORT);
});
