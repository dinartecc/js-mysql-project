"use strict";

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AddToDatabase = function AddToDatabase(mes) {
  return new Promise(function (resolve, reject) {
    var mysqlQuery = 'INSERT INTO ',
        queryCol = '',
        queryVal = '';

    if (mes.tabla == null || mes.tabla == false) {
      reject(new Error('202: No tabla seleccionada'));
    }

    mysqlQuery = mysqlQuery + mes.tabla + ' ';

    for (var columna in res) {
      if (columna != 'tabla') {
        if (queryCol.length != 0) {
          queryCol += ', ';
          queryVal += ', ';
        }

        queryCol += columna;
        queryCol;
      }
    }
  });
};
//# sourceMappingURL=AddToDatabase.js.map