const router = require('express').Router();
import mysql from 'mysql';


var connection = mysql.createPool({
  connectionLimit: 10,
  host     : 'localhost',
  user     : 'root',
  password : 'admin',
  database : 'inventario',
  multipleStatements: true
});


router.get('/',(req, res) => {
    res.render('inicio.hbs');
})





/* ----- Clientes ----- */
router.get('/clientes',(req, res) => {
    connection.query('SELECT * FROM cliente limit 10 ; SELECT Count(*) AS total from cliente; ', function (error, results, fields) {
        if (error) throw error;
        var respuesta = JSON.parse(JSON.stringify(results[0]));
        var contar = JSON.parse(JSON.stringify(results[1]));
        contar = contar[0].total;
        res.render('clientes.hbs', {respuesta, contar});
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

router.post('/clientes/buscar', function(req, res){
    const {busqueda, check} = req.body;
    connection.query(`SELECT * from cliente where ${check} like '%${busqueda}%'`, function (error, results, fields){
        if (error) throw error;
        results.forEach(results => {
            console.log('\n\n\n\n\n');
            console.log('Se ha encontrado ' + results.nombre);
        });
       
        var respuesta = JSON.parse(JSON.stringify(results));
        res.json({ respuesta });
    })
});
module.exports = router;