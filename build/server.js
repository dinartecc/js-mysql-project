"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = require("body-parser");

var _CreateConnection = _interopRequireDefault(require("./ServerComponents/CreateConnection/CreateConnection"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import UpdateSchema from './ServerComponents/UpdateSchema/UpdateSchema';
var app = (0, _express["default"])(); //UpdateSchema();

/* ----- Configuraciones ----- */

app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public'))); // Al parecer esto no funcionaba  xdd

app.set('views', _path["default"].join(__dirname, '/views'));
app.engine('.hbs', (0, _expressHandlebars["default"])({
  //configurando handlebars
  defaultLayout: 'main',
  layoutsDir: _path["default"].join(app.get('views'), 'layouts'),
  partialsDir: _path["default"].join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use('/post', (0, _bodyParser.json)());
app.use('/post', (0, _bodyParser.urlencoded)({
  extended: true
}));
app.set('port', process.env.PORT || 4020);
/* ----- Rutas ----- */

app.use(require('./Routes/index.js'));
app.use(require('./Routes/prueba.js'));
/* ----- Server Running ----- */

app.listen(process.env.PORT || 4020, function () {
  console.log('Your node js server is running');
});
//# sourceMappingURL=server.js.map