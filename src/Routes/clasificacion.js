
const router = require('express').Router();
import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';
import connection from '../ServerComponents/CreateConnection/CreateConnection';
import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase';

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


router.get('/clasificacion',async (req, res) => {
    
    const categoriaQuery = {
        tabla: 'categoria',
        desc: true
    }
    const marcaQuery = {
        tabla: 'marca',
        desc: true
    }

    const subcategoriaQuery = {
      tabla: 'subcategoria',
      desc: true,
      columnas: ['id','nombre','ID_categoria'],
      foranea: {
        ID_categoria: {
          tabla: 'categoria',
          columnas: ['nombre']
        }
      }
  };
    
    const categoria = JSON.parse(JSON.stringify(await QueryDatabase( categoriaQuery )))
    const subcategoria = JSON.parse(JSON.stringify(await QueryDatabase( subcategoriaQuery )))
    const marca = JSON.parse(JSON.stringify(await QueryDatabase( marcaQuery )))
    
    res.render('clasificacion', {categoria, subcategoria, marca})
})



router.post('/clasificacion/categoria', (req, res) => {
    const categoria = {
        tabla: 'categoria',
        nombre: req.body.nombre,
    }
    AddToDatabase( categoria )
    .then(console.log("bien hecho :D"))
    .catch( (response) => console.log(response))
    console.log(req.body)
})


router.post('/clasificacion/marca', (req, res) => {
    const marca = {
        tabla: 'marca',
        nombre: req.body.nombre,
    }
    AddToDatabase( marca )
    .then(console.log("bien hecho :D"))
    .catch( (response) => console.log(response))
    console.log(req.body)
})

router.post('/clasificacion/buscar', (req, res) => {
    let {busqueda, tabla} = req.body
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
module.exports = router;
