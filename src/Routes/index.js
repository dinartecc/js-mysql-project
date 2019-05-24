const router = require('express').Router();
import ResetDatabase from '../ServerComponents/InitializeDatabase/ResetDatabase';
import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase'
import SchemaQuery from '../ServerComponents/HandleSchema/SchemaQuery';
import DefaultDatabase from '../ServerComponents/InitializeDatabase/DefaultDatabase';
import DeleteFromDatabase from '../ServerComponents/DeleteFromDatabase/DeleteFromDatabase';
import ValidateInput from '../ServerComponents/ValidateInput/ValidateInput';
import UpdateDatabase from '../ServerComponents/UpdateDatabase/UpdateDatabase';
import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';

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
router.post('/prueba', (req, res) => {

  console.log(req.body)
  // const test = {
  //   tabla : 'cliente',
  //   nombre : 'cliente1',
  //   telefono : '111',
  //   direccion : 'Casita'
  // }
  const test = {
    tabla: 'subcategoria',
    ID_categoria: 2,
    nombre: 'NREL',
   }

   

//   const test = {
//     tabla: 'subcategoria',
//       desc: true,
//       columnas: ['nombre','ID_categoria','id'],
//       foranea: {
//         ID_categoria: {
//           tabla: 'categoria',
//           columnas: ['nombre']
//         }
//       },
//     condiciones : {
//       nombre: '' 
//     },
//     foranea: {
//       ID_categoria: {
//         tabla: 'categoria',
//         columnas: ['nombre', 'ID_categoria']
//       }
//     }
// };

// const test = {
//   tabla: ['categoria'],
//   columnas: ['nombre', 'direccion'],
//   condiciones: { id: '2'},
//   columnas: ['nombre', 'id'],
//   limite: 25
// }


//console.log(borrar)
//DeleteFromDatabase( borrar )

   AddToDatabase(test)
   .then( response => res.send( response ) )
    .catch( response => console.log (response) );
  // res.send(ValidateInput(test));

  // UpdateDatabase ( test )
  // .catch((e)=> console.log(e));

  // QueryDatabase( test )
  //   .then( response => res.send( response ) )
  //   .catch( response => console.log (response) );
  
  // HandleSchema().then(ro=> res.send(ro));
});

/* ----- Clientes ----- */






module.exports = router;
