"use strict";

var _CreateConnection = _interopRequireDefault(require("../ServerComponents/CreateConnection/CreateConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = require('express').Router();

router.get('/post', function (req, res) {
  var connection = _CreateConnection["default"];
  connection.connect(); //Aqui hace tus pruebas chanchas

  connection.query('SELECT * from saludo', function (error, results, fields) {
    console.log(results);
    console.log("------------------");
    console.log(fields);
  });
  res.send('nice!');
  connection.end();
});
module.exports = router;
//# sourceMappingURL=prueba.js.map