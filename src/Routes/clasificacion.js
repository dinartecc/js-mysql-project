
const router = require('express').Router();
import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';
import CreateConnection from '../ServerComponents/CreateConnection/CreateConnection';
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
    console.log(subcategoria)
    res.render('clasificacion', {categoria, subcategoria, marca})
    /*.then((response) => {
        return categoria = JSON.parse(JSON.stringify(response))
    }).then((response) => console.log(response))*/
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

module.exports = router;
  