"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CreateConnection = _interopRequireDefault(require("../CreateConnection/CreateConnection"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *Funcion que hace una query a la base de datos para obtener una copia del schema en formato json.
 *
 */
var SchemaQuery = function SchemaQuery() {
  return new Promise(function (resolve, reject) {
    //Se crea el string de la query y el objeto de a conexion
    var mysqlQuery = "select TABLE_NAME, COLUMN_NAME, DATA_TYPE from Information_schema.columns where TABLE_SCHEMA = 'heroku_8e679e6d32fb43a'",
        connection = _CreateConnection["default"];
    connection.connect(); // Se realiza la query

    connection.query(mysqlQuery, function (error, results, fields) {
      connection.end();
      if (error) reject(new Error(error)); //Si no hubo error, se hace un objeto schema, donde cada nombre de la tabla es una 
      //propiedad del objeto, y cada columna es una propiedad anidada con el tipo de dato que es.

      var schema = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tupla = _step.value;

          if (!(tupla.TABLE_NAME in schema)) {
            schema[tupla.TABLE_NAME] = {};
          }

          schema[tupla.TABLE_NAME][tupla.COLUMN_NAME] = tupla.DATA_TYPE;
        } //Se guarda la ultima vez que se actualizo el schema

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      schema.lastUpdate = Date.now(); //Se guarda el schema en formato JSON

      _fs["default"].writeFile(_path["default"].join(__dirname, '../../ServerFiles/Schema.json'), JSON.stringify(schema), function (err) {
        if (error) reject(new Error(err));
      });

      resolve(null);
    });
  });
};

var _default = SchemaQuery;
exports["default"] = _default;
//# sourceMappingURL=SchemaQuery.js.map