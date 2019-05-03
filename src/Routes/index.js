const router = require('express').Router();
import mysql from 'mysql';
import InitializeDatabase from '../ServerComponents/InitializeDatabase/InitializeDatabase';
import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';
import UpdateSchema from '../ServerComponents/UpdateSchema/SchemaQuery';
import UpdateDatabase from '../ServerComponents/UpdateDatabase/UpdateDatabase';
import DeleteFromDatabase from '../ServerComponents/DeleteFromDatabase/DeleteFromDatabase';
import CreateConnection from '../ServerComponents/CreateConnection/CreateConnection';

const connection = CreateConnection;


router.get('/',(req, res) => {
    res.render('inicio.hbs');
})

/* ----- Inicializar Database -----*/
router.get('/initdb', ( req, res ) => {
  InitializeDatabase();
  res.send('xd');
});

/* ----- Actualizar Schema ------- */
router.get('/updateschema', (req, res ) => {
  UpdateSchema();
  res.send('Good!');
});
/* ----- Prueba ---- */
router.get('/prueba', (req, res) => {
  // const test = {
  //   tabla : 'cliente',
  //   nombre : 'cliente1',
  //   telefono : '111',
  //   direccion : 'Casita'
  // }
  const test = {
    tabla : 'cliente',
    id: 4,
    nombre: 'Carlos',
    telefono: 8
  }
  // const test = {
  //   tabla : 'cliente',
  //   id : 1
  // }
  UpdateDatabase( test )
    .then( response => res.send( response ) )
    .catch( response => console.log (response) );
});

/* ----- Clientes ----- */
router.get('/clientes',(req, res) => {
    connection.query('SELECT * FROM Cliente limit 10 ; SELECT Count(*) AS total from Cliente;', function (error, results, fields) {
        if (error) throw error;
        var respuesta = JSON.parse(JSON.stringify(results[0]));
        var contar = JSON.parse(JSON.stringify(results[1]));
        contar = contar[0].total;
        res.render('clientes.hbs', {respuesta, contar});
    })
});

router.post('/clientes/borrar/', (req, res) => {
    console.log(req.body.select)
    const cliente = {
        tabla: 'cliente',
        id: req.body.select.id
    }
    DeleteFromDatabase ( cliente )
    .then( ( ) => res.send("Elimnado!"))
    .catch( (response) => console.log(response))
})
router.post('/clientes/actualizar/', (req,res) => {
    const {nombre, telefono, direccion, id} = req.body.cliente;
    console.log(nombre)
    const cliente = {
        tabla: 'cliente',
        id,
        nombre,
        telefono,
        direccion
    }
    UpdateDatabase( cliente )
    .then( () => res.send("OK") )
    .catch( (response) => console.log(response))

})
router.post('/clientes/nuevo', (req, res) => {
    const cliente = {
        tabla: 'cliente',
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.telefono
    }
    AddToDatabase( cliente )
    .then( () => res.redirect('/clientes'))
    .catch( (response) => console.log(response))
    
})

router.post('/clientes/buscar', function(req, res){
    const {busqueda, check} = req.body;
    connection.query(`SELECT * from Cliente where ${check} like '%${busqueda}%' `, function (error, results, fields){
        console.log(check)
        console.log(busqueda)
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
