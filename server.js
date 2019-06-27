//const base64 = require('base-64');
//const axios = require('axios');
require('./_helper/lib-helper');
const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const PORT = 4000;
const path = require('path');
const uuid = require('uuid/v4')
const passport = require('passport');
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const {
  PassportHelper
} = require('./_server/api/auth-api');
const {
  initializeAllRoute
} = require('./_server/api/_route.js');
const schemaCF = require('./_server/schema/_schema.js');
const {
  Secret
} = require('./_server/secret/secret');

// ##################################################################
// ##################################################################

const isProd = (process.env.NODE_ENV === "production");
var root = (isProd) ? "/cf" : "";
if (isProd) {
  console.log = function (mes) {
    return;
  };
}

// ##################################################################
// ##################################################################

// 1. Add Session
app.use(session({
  genid: (req) => {
    // console.log("[SESSION]", "url", req.url)
    // console.log("[SESSION]", "sessionID", req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: Secret.SESSION,
  resave: false,
  saveUninitialized: true
}))

// 2. Passport init
passport.use(PassportHelper.localStrategy);
passport.serializeUser(PassportHelper.serializeUser);
passport.deserializeUser(PassportHelper.deserializeUser);
app.use(passport.initialize());
app.use(passport.session());

// Test session
// app.get('/', (req, res) => {
//   console.log('Inside the homepage callback function')
//   console.log("SESSION ID FROM CLIENT => " + req.sessionID)
//   res.send(`You hit home page!\n`)
// })

// 2. body parser used in post argument
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// 3. allow CORS
if (!isProd) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

// 4. Static Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// 5. Graphql route
app.use(root + '/graphql', expressGraphQL({
  schema: schemaCF,
  graphiql: (process.env.NODE_ENV === "production") ? false : true //set able to use the graphQL web IDE to true
}));

// 6. All other route (APIS)
initializeAllRoute(app, root, passport);

// 7. Main Route For Index
const {
  template
} = require('./_server/html/template.js');
app.get('*', function (req, res, next) {
  //console.log("req.url", req.url)
  res.send(template(req.url));
});

// 8. Start Listening
app.listen(PORT, () => {
  console.log("Express and GraphQL Server is now running on port " + PORT);
});


// ##################################################################
// ##################################################################


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
