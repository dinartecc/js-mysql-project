const router = require('express').Router();
import mysql from 'mysql';
var connection = mysql.createPool({
  connectionLimit: 10,
  host     : 'localhost',
  user     : 'root',
  password : 'admin',
  database : 'inventario'
});


router.get('/registro',(req, res) => {
    res.render('register');
})


router.get('/',(req, res) => {
    res.render('inicio.hbs');
})


router.get('/clientes',(req, res) => {
    var query = "SELECT * FROM cliente limit 10";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        var respuesta = JSON.parse(JSON.stringify(results));
        res.render('clientes.hbs', {respuesta});
    })
});

router.post('/clientes/nuevo', (req, res) => {
    console.log(req);
    //const {nombre, telefono, direccion} = req.body;
    //console.log(nombre)
    res.send('YEA');
})

module.exports = router;