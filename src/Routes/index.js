const router = require('express').Router();
import mysql from 'mysql';
import InitializeDatabase from '../ServerComponents/InitializeDatabase/InitializeDatabase';
import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';
import UpdateSchema from '../ServerComponents/UpdateSchema/SchemaQuery';
import UpdateDatabase from '../ServerComponents/UpdateDatabase/UpdateDatabase';
import DeleteFromDatabase from '../ServerComponents/DeleteFromDatabase/DeleteFromDatabase';
import CreateConnection from '../ServerComponents/CreateConnection/CreateConnection';



router.get('/',(req, res) => {
    console.log(req.user)
    req.session.nombre = "Leonel";
    res.render('inicio.hbs');
})

router.get('/hola',(req, res) => {
    
    res.send(req.session.nombre);
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
  // const test = {
  //   tabla : 'cliente',
  //   id: 4,
  //   nombre: 'Carlos',
  //   telefono: 8
  // }
  // const test = {
  //   tabla : 'cliente',
  //   id : 1
  // }
  const test = {
    tabla: 'cliente',
    columnas: ['nombre', 'direccion'],
    orden: 'direccion',
    desc: true,
    condiciones: { telefono: 1 }
  }
  QueryDatabase( test )
    .then( response => res.send( response ) )
    .catch( response => console.log (response) );
});



/* ----- Clientes ----- */






module.exports = router;
