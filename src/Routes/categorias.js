
const router = require('express').Router();
import mysql from 'mysql';

const connection = mysql.createPool({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'Inventario',
    multipleStatements: true
});

router.get('/categorias', (req, res) => {
    res.render('categorias')
})

module.exports = router;
  