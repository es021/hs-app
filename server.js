require('./_helper/lib-helper');
const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const PORT = 7000;
const path = require('path');
const jwt = require('jsonwebtoken');

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

// 2. body parser used in post argument
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// Init JWT
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjozMDIsImlhdCI6MTU2MTk2ODQ0M30.wBwGMY8GgNLBe8shzwkXczkJkZ_Az7htqOTijSgqxn0
app.use(function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log("req.headers.authorization", req.headers.authorization);
    // console.log("token from client", token)
    jwt.verify(token, Secret.JWT_TOKEN_KEY, function (err, payload) {
      // console.log("payload", payload)
      // console.log("req.body.userId", req.body.uuid)
      if (payload) {
        if (payload.uuid == req.body.uuid) {
          next()
        } else {
          res.status(500).json({
            error: `Invalid Token (uuid : ${req.body.uuid})`
          });
        }
      } else {
        next()
      }
    })
  } catch (e) {
    next()
  }
})

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
initializeAllRoute(app, root);

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
// deprecated -- in nginx, gzip serve tru nginx 
// // no need for this
// const publicRoot = (isProd) ? "" : "public";
// const hasGz = [
//     "/asset/js/main.bundle.js"
//     //, "/asset/js/vendors.bundle.js"
//     //, "/asset/css/main.bundle.css"
// ];

// app.get(root + '/asset/*', function (req, res, next) {
//     //strip version query
//     console.log(req);
//     if (req.url.indexOf("?v=") >= 0) {
//         var urlArr = req.url.split("?v=");
//         req.url = urlArr[0];
//         var version = urlArr[1];
//     }

//     if (hasGz.indexOf(req.url) >= 0) {
//         req.url = req.url + '.gz' + "?v=" + version;
//         console.log(req.url);
//         res.set('Content-Encoding', 'gzip');
//     }
//     next();
// });



// ##################################################################
// ##################################################################

// 1. Add Session
// app.use(session({
//   genid: (req) => {
//     // console.log("[SESSION]", "url", req.url)
//     // console.log("[SESSION]", "sessionID", req.sessionID)
//     return uuid() // use UUIDs for session IDs
//   },
//   store: new FileStore(),
//   secret: Secret.SESSION,
//   resave: false,
//   saveUninitialized: true
// }))

// 2. Passport init
// passport.use(PassportHelper.localStrategy);
// passport.serializeUser(PassportHelper.serializeUser);
// passport.deserializeUser(PassportHelper.deserializeUser);
// app.use(passport.initialize());
// app.use(passport.session());

// Test session
// app.get('/', (req, res) => {
//   console.log('Inside the homepage callback function')
//   console.log("SESSION ID FROM CLIENT => " + req.sessionID)
//   res.send(`You hit home page!\n`)
// })

//const base64 = require('base-64');
//const axios = require('axios');
// const uuid = require('uuid/v4')
// const passport = require('passport');
// const session = require('express-session')
// const FileStore = require('session-file-store')(session);
// const {
//   PassportHelper
// } = require('./_server/api/auth-api');
