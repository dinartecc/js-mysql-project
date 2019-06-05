 const router = require('express').Router();
import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase'
import connection from '../ServerComponents/CreateConnection/CreateConnection';
import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';
import UpdateDatabase from '../ServerComponents/UpdateDatabase/UpdateDatabase';
import GetSchema from '../ServerComponents/HandleSchema/GetSchema';
import crypto from 'crypto-js'
import DeleteFromDatabase from '../ServerComponents/DeleteFromDatabase/DeleteFromDatabase';


router.post('/roles/add', (req, res) =>{
    
    console.log(req.body)
    const [Clasificacion, Lotes, Productos, Reportes, Usuarios] = req.body.data;
    const {nombre} = req.body.info;
    const query = {
      tabla : "roles",
      clasificacion : Clasificacion,
      lotes : Lotes,
      productos: Productos,
      reportes : Reportes,
      nombre
    };
    
    AddToDatabase(query)
      .then( () => res.send('OK'))
      .catch( (err) => {
        console.log(err);
        res.status(404).end();
      });
})

router.post('/roles/edit', (req, res) =>{
  const [Clasificacion, Lotes, Productos, Reportes, Usuarios] = req.body.data;
  const {nombre, id} = req.body.info;
  
  const Query = {
    tabla:          'roles',
    id,
    clasificacion:  Clasificacion,
    lotes:          Lotes,
    productos:      Productos,
    reportes:       Reportes,
    nombre:         nombre
  }
  if(id !== 1){
    UpdateDatabase( Query )
    .then((response) => {
        console.log(`Se ha actualizado el registro ${id} de la tabla Roles`);
        res.send('Actualizado Exitosamente!');
    })
    .catch((error) => {
        console.log(error)
        res.status(404).end();
    })
  }else{
    res.status(404).end();
  }
    

})
router.post('/usuarios/eliminar', (req, res) => {
  const {tabla, id} = req.body.query
  const Query = {
    tabla: 'usuarios',
    id
  }

  if(id != 1){
    console.log(Query)
    DeleteFromDatabase(Query)
    .then((response) => res.send('OK'))
    .catch(() => {
      res.status(404).end();
  })
  }else{
    res.status(404).end();
  }

  
})

router.post('/usuarios/nuevo', (req,res) => {
  const {query} = req.body
  let hash = crypto.SHA256(query.pass)
  query.pass = hash.toString()
  AddToDatabase( query )
  .then((response)  =>  {
    res.send('OK')
  })
  .catch((error) => {
    console.log(error)
  })
})

router.post('/usuarios/editar', (req, res) => {
  const {query} = req.body;
  console.log(query)
  query.tabla = 'usuarios'
  if(query.pass != ''){
    let hash = crypto.SHA256(query.pass)
    query.pass = hash.toString()
  }else{
    delete query.pass;
  }

  if(!(query.id == 1 && query.ID_rol != 1 ) || (query.id != 1)){
    UpdateDatabase( query )
    .then((response) => {
      console.log('Elemento actualizado!')
      res.send('OK')
    })
    .catch((error) => {
      console.log(error)
      res.status(404).end();
    })
  }else{
    res.status(404).end();
  }

  

})

router.post('/usuarios/buscar', (req, res) => {
  
  let {tabla, busqueda, tipo, pagina} = req.body;

  const Query = {
    tabla: tabla,
    columnas: ['nombre', 'id'],
    desc: true,
    pagina: pagina
  }


  QueryDatabase( Query )
  .then((response) => {
    res.json(response)
  })
  .catch((error) => console.log(error))


})

// Ruta que te responde con todos los usuarios
router.get('/getusers', (req, res) => {
    const Query = {
        tabla: 'usuarios',
        desc: true,
        columnas: ['id','name','user','ID_rol'],
        foranea: {
          ID_rol: {
            tabla: 'roles',
            columnas: ['nombre']
          }
        }
      };


      const schemaFull = GetSchema(),
      schema = (({ usuarios }) => ({ usuarios }))(schemaFull);


    QueryDatabase( Query )
    .then((response)=> {
        response = JSON.stringify({users: response, schema})
 
        res.json(response)
    })
    .catch((response) => {
        console.log(response)
    })
})

// Ruta que le pasas un id como body, revisa entre todas las sesiones activas si hay alguna con ese id de ese rol.
// Si es asi, borra esa registro o mejor dicho, esa "sesion"
router.post('/resetroles', (req, res) => {
    const {id} = req.body;
    connection.query('select * from sessions', function(errror, results, fields){
        results.forEach(function(elemento, index) {
          let temp = JSON.parse(elemento.data)
          if(temp.ID_rol == id){
            connection.query(`DELETE FROM sessions WHERE session_id = '${elemento.session_id}'`, function(error, results, fields){
              if (error) throw error;
            })
          }
        })
    })
    res.send('Rol reseteado')
})



// Ruta que te retorna todos los roles existentes
router.get('/getroles', (req, res) => {

    const Query = {
        tabla: 'roles',
        columnas: ['id', 'nombre', 'productos', 'clasificacion', 'lotes', 'reportes', 'administrador']
    }

    QueryDatabase( Query )
    .then((response) => {
        res.send(JSON.stringify(response))
    })
})




module.exports = router;
