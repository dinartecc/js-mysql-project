"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _SchemaQuery = _interopRequireDefault(require("./SchemaQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Actualiza el schema local de la base de datos
 *
 * @param {boolean} [forced=false] Si se desea forzar una actualizacion del schema
 */
var UpdateSchema = function UpdateSchema() {
  var forced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  //Lee el archivo local del schema
  _fs["default"].readFile(_path["default"].join(__dirname, '../../ServerFiles/Schema.json'), 'utf8', function (err, data) {
    //Si el archivo no existe o si se fuerza el update, se ejecuta SchemaQuery
    if (err || forced) {
      (0, _SchemaQuery["default"])()["catch"](function (error) {
        return console.log(error);
      });
      return undefined;
    } // Si el archivo existe, chequea la ultima vez que se actualizo el schema. 
    // Si fue hace mas de 30 min, se actualiza el schema.


    if (JSON.parse(data).lastUpdate + 1800000 < Date.now()) {
      (0, _SchemaQuery["default"])()["catch"](function (error) {
        return console.log(error);
      });
    }
  });
};

var _default = UpdateSchema;
exports["default"] = _default;
//# sourceMappingURL=UpdateSchema.js.map