"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = require("path");

var _bodyParser = require("body-parser");

var _UpdateSchema = _interopRequireDefault(require("./ServerComponents/UpdateSchema/UpdateSchema"));

var _CreateConnection = _interopRequireDefault(require("./ServerComponents/CreateConnection/CreateConnection"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _UpdateSchema["default"])();
app.use(_express["default"]["static"]('public'));
app.use('/post', (0, _bodyParser.json)());
app.use('/post', (0, _bodyParser.urlencoded)({
  extended: true
}));
app.set('port', process.env.PORT || 4020);
/* ----- Rutas ----- */

app.use(require('./Routes/index.js'));
app.get('/post', function (req, res) {
  var connection = _CreateConnection["default"];
  connection.connect();
  connection.query('SELECT * from test', function (error, results, fields) {
    console.log(results);
    console.log(fields);
  });
  res.send('nice!');
  connection.end();
});
app.listen(process.env.PORT || 4020, function () {
  console.log('Your node js server is running');
});
//# sourceMappingURL=server.js.map