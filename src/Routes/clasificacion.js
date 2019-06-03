
const router = require('express').Router();
import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';
import DeleteFromDatabase from '../ServerComponents/DeleteFromDatabase/DeleteFromDatabase';
import UpdateDatabase from '../ServerComponents/UpdateDatabase/UpdateDatabase';
import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase';
import { promises, readFileSync } from 'fs';
import GetSchema from '../ServerComponents/HandleSchema/GetSchema';
import CheckForeigns from '../ServerComponents/CheckForeigns/CheckForeigns';


// const subcategoria  = [
//     {
//         id: 1,
//         nombre: 'Lacteos',
//         padre: 'Alimentos'
//     },
//     {
//         id: 1,
//         nombre: 'Carnes',
//         padre: 'Alimentos'
//     },
//     {
//         id: 1,
//         nombre: 'Vegetales',
//         padre: 'Alimentos'
//     },
//     {
//         id: 1,
//         nombre: 'Frutas',
//         padre: 'Alimentos'
//     }
// ]



router.get('/clasificacion/info',async(req, res) => {
        
    const categoriaQuery = {
        tabla: 'categoria',
        columnas: ['nombre', 'id'],
        desc: true
    }
    const marcaQuery = {
        tabla: 'marca',
        columnas: ['nombre', 'id'],
        desc: true
    }
    const subcategoriaQuery = {
      tabla: 'subcategoria',
      desc: true,
      columnas: ['nombre','ID_categoria','id'],
      foranea: {
        ID_categoria: {
          tabla: 'categoria',
          columnas: ['nombre']
        }
    }
    };

    console.time("Time this");

    const [categoria, subcategoria, marca] = await Promise.all([
        QueryDatabase( categoriaQuery ),
        QueryDatabase( subcategoriaQuery ),
        QueryDatabase( marcaQuery )
    ])

    const schemaFull = GetSchema(),
          schema = (({ categoria, subcategoria, marca }) => ({ subcategoria, categoria, marca }))(schemaFull);
    res.json({categoria, subcategoria, marca, schema})
    console.timeEnd("Time this");
   
})




router.post('/clasificacion/nuevo',async (req, res) => {

    const query = req.body.query;

    if(typeof query == 'undefined' && typeof query.tabla == 'undefined' ){
        res.status(404).end();
    }
    
    try{
        await CheckForeigns(query).then(()=>AddToDatabase( query )).catch((e)=>res.status(404).end());
        console.log(`Registro añadido a la tabla ${query.tabla} exitosamente`)
        let resp = 'Elemento añadido exitosamente!';
        res.send(JSON.stringify(resp))
    }catch(e){
        console.log(e)  
        res.status(404).end();
    }
});


router.post('/clasificacion/editar', async (req, res) => {

  const query = req.body.query;
  if(typeof query == 'undefined' && typeof query.tabla == 'undefined' && typeof query.id == 'undefined' ){
      res.status(404).end();
  }
  
  await CheckForeigns(query).then(()=> 
    UpdateDatabase( query )
      .then(()=> {
        console.log(`Registro ${query.id} de la tabla ${query.tabla} editado exitosamente`)
        let resp = 'Elemento editado exitosamente!';
        res.send(JSON.stringify(resp));
      })
      .catch(err => {
        console.log(err)  
       res.status(404).end();
    }))
    .catch((e)=>res.status(404).end());
});



router.post('/clasificacion/eliminar' ,(req, res) => {
    const {seccion, id} = req.body.query;
    let resp;
    console.log(req.body)
    const borrar = {
        tabla: seccion,
        id: id
    }
    
    DeleteFromDatabase( borrar ).then(console.log("BORRADO >:D"))
    .then(() => console.log(`Registro de ${seccion} eliminado exitosamente`))
    .then(() => { return resp = 'Elemento eliminado exitosamente!'} )
    .then((resp) => res.send(JSON.stringify(resp)))
    .catch((response) => console.log(response))
     
});

router.post('/clasificacion/buscar/',async (req, res) =>{
    for( let variable in req.body ){ // Cambia a minuscula todas las variables en req.body
        typeof req.body[variable] == 'string' ? req.body[variable] = req.body[variable].toLowerCase() : null 
    }   

    let {tabla, busqueda, tipo} = req.body;

    if(typeof tabla === undefined || typeof busqueda === undefined  || typeof tipo === undefined) { // Si alguna variable no existe...
        res.response("NEL")
    }

    const query = {
        tabla:  tabla,
        desc: true
    }
    query.condiciones = {};
    query.condiciones[tipo] = busqueda;
    switch (tabla) {
        case 'categoria':
            query.columnas = ['nombre', 'id']
            break;
        case 'subcategoria':
            query.columnas = ['nombre','ID_categoria','id']
            query.foranea = { 
                ID_categoria: {
                    tabla: 'categoria',
                    columnas: ['nombre']
                }
            }
            break;
        case 'marca':
            query.columnas = ['nombre', 'id']
            break;

        default:
            //res.send("NEL")
            break;
    }

    if( tabla == 'todo' ){

        const categoriaQuery = {
            tabla: 'categoria',
            columnas: ['nombre', 'id'],
            desc: true,
        }
        
        const marcaQuery = {
            tabla: 'marca',
            columnas: ['nombre', 'id'],
            desc: true
        }
        const subcategoriaQuery = {
          tabla: 'subcategoria',
          desc: true,
          columnas: ['nombre','ID_categoria','id'],
          foranea: {
            ID_categoria: {
              tabla: 'categoria',
              columnas: ['nombre']
            }
        }
        };
   
        categoriaQuery.condiciones = {}
        marcaQuery.condiciones = {}
        subcategoriaQuery.condiciones = {}


        categoriaQuery.condiciones[tipo] = busqueda
        marcaQuery.condiciones[tipo]= busqueda
        subcategoriaQuery.condiciones[tipo] = busqueda
        const [categoria, subcategoria, marca] = await Promise.all([
            QueryDatabase( categoriaQuery ),
            QueryDatabase( subcategoriaQuery ),
            QueryDatabase( marcaQuery )
        ])
        res.json({categoria, subcategoria, marca})
    
    }else{
        QueryDatabase ( query )
        .then((response) => {
        
        res.send(JSON.stringify(response))
    })
    }
    //if(req.params == 'marca'){ query.columnas = ["orden 1", "orden 2"]}
})
module.exports = router;
