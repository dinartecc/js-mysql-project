"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = require("path");

var _mysql = require("mysql");

var _bodyParser = require("body-parser");

var _UpdateSchema = _interopRequireDefault(require("./ServerComponents/UpdateSchema/UpdateSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _UpdateSchema["default"])();
app.use(_express["default"]["static"]('public'));
app.use('/post', (0, _bodyParser.json)());
app.use('/post', (0, _bodyParser.urlencoded)({
  extended: true
}));
app.set('port', process.env.PORT || 4020);
app.get('/', function (req, res) {
  res.sendFile((0, _path.join)(__dirname, 'index.html'));
});
app.post('/post', function (req, res) {
  var connection = (0, _mysql.createConnection)({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b7282d3c829f44',
    password: '49ad92bf',
    database: 'heroku_8e679e6d32fb43a'
  });
  connection.connect();
  var _req$body = req.body,
      Nombre = _req$body.Nombre,
      Apellidos = _req$body.Apellidos,
      Cargo = _req$body.Cargo,
      Tratamiento = _req$body.Tratamiento,
      FechaNacimiento = _req$body.FechaNacimiento,
      FechaContratacion = _req$body.FechaContratacion,
      Direccion = _req$body.Direccion,
      Ciudad = _req$body.Ciudad,
      Region = _req$body.Region,
      CodPostal = _req$body.CodPostal,
      Pais = _req$body.Pais,
      TelDomicilio = _req$body.TelDomicilio,
      Extension = _req$body.Extension,
      Notas = _req$body.Notas,
      Jefe = _req$body.Jefe;
  connection.query('select IdEmpleado from empleados order by IdEmpleado desc limit 0, 1;', function (error, results, fields) {
    if (error) {
      res.status(400).send("unable to save to database");
      connection.end();
      throw error;
    }

    var newId = results[0].IdEmpleado + 1;
    var mysqlQuery = "INSERT INTO empleados ( IdEmpleado, Nombre, Apellidos, Cargo, Tratamiento, FechaNacimiento, FechaContrataci\xF3n, Direcci\xF3n, Ciudad, Regi\xF3n, C\xF3dPostal, Pa\xEDs, TelDomicilio, Extensi\xF3n, Notas, Jefe)\n                      values ( ".concat(newId, ", '").concat(Nombre, "', '").concat(Apellidos, "', '").concat(Cargo, "', '").concat(Tratamiento, "', '").concat(FechaNacimiento, "', '").concat(FechaContratacion, "',\n                       '").concat(Direccion, "', '").concat(Ciudad, "', '").concat(Region, "', '").concat(CodPostal, "', '").concat(Pais, "', '").concat(TelDomicilio, "', ").concat(Extension, ", '").concat(Notas, "',\n                      '").concat(Jefe, "');");
    connection.query(mysqlQuery, function (error, results, fields) {
      if (error) {
        res.status(400).send("unable to save to database");
        connection.end();
        throw error;
      }

      res.send("item saved to database");
      connection.end();
    });
  });
});
app.listen(process.env.PORT || 4020, function () {
  console.log('Your node js server is running');
});
//# sourceMappingURL=server.js.map