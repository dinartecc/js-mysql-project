
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

    const categoria = await QueryDatabase( categoriaQuery )
    const subcategoria = await QueryDatabase( subcategoriaQuery )
    const marca = await QueryDatabase( marcaQuery )
    console.log(categoria)
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



router.get('/clasificacion/buscar/:seccion', (req, res) =>{
    const query = {
        tabla: 'hola'
    }


    if(req.params.seccion == 'marca'){ query.columnas = ["orden 1", "orden 2"]}
    

})
module.exports = router;
