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

/* ----- Clientes ----- */
router.get('/clientes',(req, res) => {
    var query = "SELECT * FROM cliente limit 10";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        var respuesta = JSON.parse(JSON.stringify(results));
        res.render('clientes.hbs', {respuesta});
    })
});

router.get('/clientes/borrar/:id', (req, res) => {
    const {id} = req.params;
    connection.query(`Delete from cliente where ID_cliente = ${id}`, function(error, results, fields){
        if (error) throw error;
        res.redirect('/clientes');
    })
})

router.post('/clientes/nuevo', (req, res) => {
    
    const {nombre, telefono, direccion} = req.body;
    connection.query(`insert into cliente(nombre,telefono,direccion) values('${nombre}','${telefono}','${direccion}')`, function (error, results, fields){
        if (error) throw error;
        res.redirect('/clientes')
    })
  
})

module.exports = router;