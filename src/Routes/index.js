const router = require('express').Router();
import ResetDatabase from '../ServerComponents/InitializeDatabase/ResetDatabase';
import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase'
import SchemaQuery from '../ServerComponents/HandleSchema/SchemaQuery';
import DefaultDatabase from '../ServerComponents/InitializeDatabase/DefaultDatabase';
import DeleteFromDatabase from '../ServerComponents/DeleteFromDatabase/DeleteFromDatabase';

SchemaQuery();

router.get('*', (req ,res , next) => {
    next()
})

router.get('/',(req, res) => {
    res.render('inicio.hbs');
    console.log()
})

router.get('/hola',(req, res) => {
    
    res.send(req.session.nombre);
})

/* ----- Inicializar Database -----*/
router.get('/db/reset', ( req, res ) => {
  ResetDatabase();
  res.send('xd');
});

router.get('/db/default', ( req, res ) => {
  DefaultDatabase();
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
  //   tabla : 'subcategoria',
  //   ID_categoria: 1,
  //   nombre: '0w0'
  // }
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

  /*const test = {
    tabla: 'subcategoria',
    desc: true,
    columnas: ['id','ID_categoria', 'nombre' ],
    condiciones : {
      nombre: '' 
    },
    foranea: {
      ID_categoria: {
        tabla: 'categoria',
        columnas: ['nombre', 'ID_categoria']
      }
    }
};*/

const borrar = {
  tabla: 'categoria',
  id: 2
}

console.log(borrar)
DeleteFromDatabase( borrar )



  /*QueryDatabase( test )
    .then( response => res.send( response ) )
    .catch( response => console.log (response) );
  */
  // HandleSchema().then(ro=> res.send(ro));
});



/* ----- Clientes ----- */






module.exports = router;
