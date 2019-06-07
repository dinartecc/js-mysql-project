const router = require('express').Router();
import ResetDatabase from '../ServerComponents/InitializeDatabase/ResetDatabase';
import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase'
import SchemaQuery from '../ServerComponents/HandleSchema/SchemaQuery';
import DefaultDatabase from '../ServerComponents/InitializeDatabase/DefaultDatabase';
import DeleteFromDatabase from '../ServerComponents/DeleteFromDatabase/DeleteFromDatabase';
import ValidateInput from '../ServerComponents/ValidateInput/ValidateInput';
import UpdateDatabase from '../ServerComponents/UpdateDatabase/UpdateDatabase';
import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';
import CreateConnection from '../ServerComponents/CreateConnection/CreateConnection';
import {join} from 'path'
import GenerateSKU from '../ServerComponents/GenerateSKU/GenerateSKU';
import AddToProduct from '../ServerComponents/AddToDatabase/AddToProduct';
import UpdateProduct from '../ServerComponents/UpdateDatabase/UpdateProduct';
import CheckForeigns from '../ServerComponents/CheckForeigns/CheckForeigns';
const connection = CreateConnection;
import crypto from 'crypto-js'
import GetAlerts from '../ServerComponents/GetAlerts/GetAlerts';
import GetSchema from '../ServerComponents/HandleSchema/GetSchema'
import LotesTakeOut from '../ServerComponents/LotesTakeOut/LotesTakeOut';
SchemaQuery();

router.get('/hola',(req, res) => {
  
})

/* ----- Inicializar Database -----*/
router.get('/db/reset', ( req, res ) => {
  try {
    ResetDatabase();
    res.send('xd');
  } catch (error) {
    console.log(error)
  }
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
  // const test = {
  //   tabla: 'subcategoria',
  //   ID_categoria: 2,
  //   nombre: 'NREL',
  //  }

   
  const obj = {
    sku: '00100100001',
    cantidad: 2
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
//       ID_categoria: 2 
//     },
//     foranea: {
//       ID_categoria: {
//         tabla: 'categoria',
//         columnas: ['nombre', 'ID_categoria']
//       }
//     }
// };
  LotesTakeOut(obj).then(r=>console.log(r)).catch(e=>console.log('xd'));

// const test = {
//   tabla: ['categoria'],
//   columnas: ['nombre', 'direccion'],
//   condiciones: { id: '2'},
//   columnas: ['nombre', 'id'],
//   limite: 25
// }

// const product = { tabla: 'producto',
// ID_marca: '2',
// ID_subcategoria: '2',
// margen_ganancia: 0,
// porcentaje_impuestos: 0,
// nombre: 'asd',
// descripcion: 'asdasd',
// vigilar: true,
// minimo_stock: '0',
// SKU: '00200200003' }


//console.log(borrar)
//DeleteFromDatabase( borrar )


  // QueryDatabase(test)
  // .then((r) => res.json(r))
  // UpdateProduct(product)
  //  .then( response => res.send( response ) )
  //   .catch( response => console.log (response) );
  // res.send(ValidateInput(test));

  // UpdateDatabase ( test )
  // .catch((e)=> console.log(e));

  // GetAlerts( )
  //   .then( response => res.send( response ) )
  //   .catch( response => console.log (response) );
  
  // HandleSchema().then(ro=> res.send(ro));
});

/* ----- Almacen ----- */


router.post('/getalertas' , (req, res) => {
  GetAlerts()
    .then((r) => res.send(r) )
    .catch((r) => console.log(r));
});


router.get('/almacen/info', (req, res) => {
  const Query = {
    tabla: 'almacen',
    columnas: ['id','nombre']
  }
  const schemaFull = GetSchema(),
    schema = (({ almacen }) => ({ almacen }))(schemaFull);
  QueryDatabase( Query )
  .then((almacen) => res.json({schema, almacen}))
})

router.post('/almacen/buscar', (req, res) => {
  const Query = {
    tabla: 'almacen',
    columnas: ['id','nombre']
  }
  
  if(req.body.busqueda != '') Query.condiciones = {nombre:req.body.busqueda};


  const schemaFull = GetSchema(),
    schema = (({ almacen }) => ({ almacen }))(schemaFull);
  QueryDatabase( Query )
  .then((almacen) => {
    console.log(almacen)
    res.json({schema, almacen})

  })
})




router.post('/almacen/buscar', (req, res) => {
  let {tabla, busqueda, tipo, pagina} = req.body;
  const Query = {
    tabla:  tabla,
    columnas: ['nombre', 'id'],
    desc: true, 
    limite: 10,
    pagina: pagina || 0
    
}
  Query.condiciones = {}
    Query.condiciones[tipo] = busqueda;
    
    QueryDatabase ( Query )
    .then((response) => {
        res.send(JSON.stringify(response));
    })
    .catch(() => res.status(404).end())

})

router.post('/salida/sacar', (req, res) => {
  const {sku, cantidad} = req.body.query
  const query = {sku, cantidad};
  query.user = req.session.user.user;
  
  LotesTakeOut(query)
  .then(r=>{
    console.log(r); 
    res.json(r)
  })
  .catch((e) => {console.log(e);res.status(404).end()})
})
module.exports = router;
