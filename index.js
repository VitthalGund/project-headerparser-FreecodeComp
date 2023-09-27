// index.js
// where your node app starts

// init project
require('dotenv').config();
let express = require('express');
const requestIp = require("request-ip");
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// // inside middleware handler
// let ipMiddleware = function (req, res, next) {
//   const clientIp = requestIp.getClientIp(req);
//   next();
// };
// //As Connect Middleware
// app.use(requestIp.mw())

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/whoami", (req, res) => {
  // let ipadress = req.clientIp;
  const ipadress = requestIp.getClientIp(req);
  let language = req.acceptsLanguages();
  let software = req.get("User-Agent");
  res.json({
    ipaddress: ipadress,
    language: language[0],
    software: software
  });
});

// listen for requests :)
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
