"use strict";

var router = require('express').Router();

router.get('/registro', function (req, res) {
  res.render('register');
});
router.get('/', function (req, res) {
  res.render('inicio.hbs');
});
module.exports = router;
//# sourceMappingURL=index.js.map