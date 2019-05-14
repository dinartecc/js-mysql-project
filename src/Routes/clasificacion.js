
const router = require('express').Router();
import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';
import DeleteFromDatabase from '../ServerComponents/DeleteFromDatabase/DeleteFromDatabase';

import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase';
import { promises } from 'fs';


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

    function sleep(ms){
        return new Promise(resolve=>{
            setTimeout(resolve,ms)
        })
    }
    console.time("Time this");
    const [categoria, subcategoria, marca] = await Promise.all([
        QueryDatabase( categoriaQuery ),
        QueryDatabase( subcategoriaQuery ),
        QueryDatabase( marcaQuery )
    ])

    /*const categoria = respuestas[0],
          subcategoria = respuestas[1],
          marca = respuestas[2];
    */
    //await sleep(2000);

    /*const categoria = await QueryDatabase( categoriaQuery )
    const subcategoria = await QueryDatabase( subcategoriaQuery )
    const marca = await QueryDatabase( marcaQuery )*/
    res.json({categoria, subcategoria, marca})
    console.timeEnd("Time this");
   
})


router.get('/clasificacion', (req, res) => {
    res.render('clasificacion-vue') // temporal ex di
})


router.post('/clasificacion/nuevo',async (req, res) => {
    console.log(req.body);
    const {seccion, nombre,categoria} = req.body.query;
    let resp;
    const query = {
        tabla: seccion,
        nombre
    }
    if(typeof categoria !== 'undefined'){
        query.ID_categoria = categoria
    }
    console.log(query)

    
    try{
        await AddToDatabase( query )
        console.log(`Registro añadido a la tabla ${seccion} exitosamente`)
        let resp = 'Elemento añadido exitosamente!';
        res.send(JSON.stringify(resp))
    }catch(e){
        console.log(e)
        res.status(404).end();
    }
    /*.catch(() => { return resp.error = 'Hubo un error al añadir el elemento :('})
    .catch((resp) => res.send(JSON.stringify({resp})))*/

})

router.post('/clasificacion/eliminar' ,(req, res) => {
    const {seccion, id} = req.body.query;
    let resp;
    console.log(req.body)
    const borrar = {
        tabla: seccion,
        id: id
    }
    console.log(borrar)
    DeleteFromDatabase( borrar ).then(console.log("BORRADO >:D"))
    .then(() => console.log(`Registro de ${seccion} eliminado exitosamente`))
    .then(() => { return resp = 'Elemento eliminado exitosamente!'} )
    .then((resp) => res.send(JSON.stringify(resp)))
    .catch((response) => console.log(response))
    
    
})

/*router.post('/clasificacion/buscar', (req, res) => {
    let {busqueda, tabla, } = req.body
    busqueda = busqueda.toLowerCase()
    tabla = tabla.toLowerCase()
    console.log(tabla)
    const query = {
        tabla:  tabla,
        desc: true,
        condiciones : {
            nombre: busqueda 
        }
        
    }
    QueryDatabase( query )
    .then((response) => {console.log(response); res.json(response) })
    .catch((response) => console.log(response))

    
    
})
*/


router.post('/clasificacion/buscar/', (req, res) =>{
    for( let variable in req.body ){ // Cambia a minuscula todas las variables en req.body
        typeof req.body[variable] == 'string' ? req.body[variable] = req.body[variable].toLowerCase() : null 
    }   

    let {tabla, busqueda, tipo} = req.body;
    console.log("aaaaaaaaaaaaaaaa" + busqueda)
    if(typeof tabla === undefined || typeof busqueda === undefined  || typeof tipo === undefined) { // Si alguna variable no existe...
        res.response("NEL")
    }

    const query = {
        tabla:  tabla,
        desc: true
    }


    query.condiciones = {};
    query.condiciones[tipo] = busqueda;
    console.log(tabla)
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
            res.send("NEL")
            break;
    }

    QueryDatabase ( query ).then((response) => res.send(JSON.stringify(response)))
    console.log(query)
    //if(req.params == 'marca'){ query.columnas = ["orden 1", "orden 2"]}
    

})
module.exports = router;
