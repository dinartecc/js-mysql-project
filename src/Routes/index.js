const router = require('express').Router();
import mysql from 'mysql';
import InitializeDatabase from '../ServerComponents/InitializeDatabase/InitializeDatabase';
import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';
import HandleSchema from '../ServerComponents/HandleSchema/HandleSchema';
import UpdateDatabase from '../ServerComponents/UpdateDatabase/UpdateDatabase';
import DeleteFromDatabase from '../ServerComponents/DeleteFromDatabase/DeleteFromDatabase';
import CreateConnection from '../ServerComponents/CreateConnection/CreateConnection';
import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase'

router.get('*', (req ,res , next) => {
    console.log(req.session);
    next()
})

router.get('/',(req, res) => {
    const {permisos} = req.session;
    console.log(permisos.clientes)
    res.render('inicio.hbs',{ permisos});
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
    nombre: 'MEKOS',
    telefono: 8
  }
  // const test = {
  //   tabla : 'cliente',
  //   id : 1
  // }
  // const test = {
  //   tabla: 'cliente',
  //   columnas: ['nombre', 'direccion'],
  //   orden: 'direccion',
  //   desc: true,
  //   limite: 25
  // }
  QueryDatabase( test )
    .then( response => res.send( response ) )
    .catch( response => console.log (response) );
  
  // HandleSchema().then(ro=> res.send(ro));
});





module.exports = router;
