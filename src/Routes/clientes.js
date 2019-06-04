const router = require('express').Router();

import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';
import UpdateDatabase from '../ServerComponents/UpdateDatabase/UpdateDatabase';
import DeleteFromDatabase from '../ServerComponents/DeleteFromDatabase/DeleteFromDatabase';
import CreateConnection from '../ServerComponents/CreateConnection/CreateConnection';
import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase';
import AddToProduct from '../ServerComponents/AddToDatabase/AddToProduct';
import CheckForeigns from '../ServerComponents/CheckForeigns/CheckForeigns';
import UpdateProduct from '../ServerComponents/UpdateDatabase/UpdateProduct';
const connection = CreateConnection;



router.get('/clientes',(req, res) => {
    const cliente = {
        tabla: 'cliente',
        columnas: ['nombre', 'direccion','telefono'],
        orden: 'direccion',
        desc: true
    }

    QueryDatabase( cliente )//.then((response) => console.log(response))
    connection.query('SELECT * FROM Cliente limit 10 ; SELECT Count(*) AS total from Cliente;', function (error, results, fields) {
        if (error) throw error;
        var respuesta = JSON.parse(JSON.stringify(results[0]));
        var contar = JSON.parse(JSON.stringify(results[1]));
        contar = contar[0].total;
        console.log(respuesta)
        res.render('clientes.hbs', {respuesta, contar});
    })
});


router.post('/clientes/nuevo', (req, res) => {
    console.log(req.body)
    const cliente = {
        tabla: 'cliente',
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.telefono
    }
    AddToDatabase( cliente )
    .then( () => res.redirect('/clientes'))
    .catch( (response) => console.log(response))
    
})


router.post('/clientes/borrar', (req, res) => {
    console.log(req.body.id)
    const cliente = {
        tabla: 'cliente',
        id: req.body.id
    }
    
    DeleteFromDatabase ( cliente )
    .then(res.send("Elimnado!"))
    .catch( (response) => console.log(response))
})






router.post('/clientes/actualizar/', (req,res) => {
    const {nombre, telefono, direccion, id} = req.body;
    console.log(nombre)
    const cliente = {
        tabla: 'cliente',
        id,
        nombre,
        telefono,
        direccion
    }
    UpdateDatabase( cliente )
    .then( () => res.send("OK") )
    .catch( (response) => console.log('response'))

})


router.post('/clientes/buscar', (req, res) => {
    const {busqueda, check} = req.body;
    connection.query(`SELECT * from Cliente where ${check} like '%${busqueda}%' `, function (error, results, fields){
        if (error) throw error;
        results.forEach(results => {
            console.log('\n\n\n\n\n');
            console.log('Se ha encontrado ' + results.nombre);
        });
       
        var respuesta = JSON.parse(JSON.stringify(results));
        res.json({ respuesta });
    })
});

router.post('/productos/editar',async (req, res) => {
    const {marca,subcategoria, margen, impuesto, nombre, descripcion, minimoStock, vigilar, perecedero, sku} = req.body.query;
    const Query = {
        tabla: 'producto',
        ID_marca :              marca,
        ID_subcategoria:        subcategoria, 
        margen_ganancia:        margen,
        porcentaje_impuestos:   impuesto,
        nombre :                nombre,
        descripcion:            descripcion,
        vigilar:                vigilar,
        minimo_stock:           minimoStock,
        perecedero:             perecedero,
        SKU:                    sku
    }
    console.log(Query)
    await CheckForeigns(Query)
    .then(()=> {
        UpdateProduct( Query )
        .then(console.log('Elemento editado exitosamente'))
        .then(res.send('OK'))
        .catch((error) => console.log(error))
        .catch(() => res.status(404).end())

    })
    .catch((e)=>res.status(404).end());
})

router.post('/productos/nuevo', (req, res) => {
    console.log(req.body)
    const {marca,subcategoria, margen, impuesto, nombre, descripcion, minimoStock, vigilar, perecedero} = req.body.query;
    const Query = {
        tabla: 'producto',
        ID_marca :              marca,
        ID_subcategoria:        subcategoria, 
        margen_ganancia:        margen,
        porcentaje_impuestos:   impuesto,
        nombre :                nombre,
        descripcion:            descripcion,
        vigilar:                vigilar,
        minimo_stock:           minimoStock,
        perecedero:             perecedero
    }

    if(nombre !== ''){
        console.log(Query)
        AddToProduct( Query )
        .then(() => res.send('OK'))
        .then(console.log('Elemento anadido exitosamente'))
        .catch((error) => {
            console.log(error)
            res.status(404).end()
        })

        
    }else{
        res.status(404).end();

    }
    
    
 
})

router.post('/productos/eliminar', (req, res ) => {
    const sku = req.body.query;
    console.log(req.body)
    const Query = {
        tabla: 'producto',
        id:  sku
    }
    console.log(Query)
    DeleteFromDatabase( Query )
    .then(res.send('OK'))
    .catch(e => console.log(e))
})


router.post('/productos/info', (req, res) => {
    console.log('hey')
    const {pagina, busqueda} = req.body;
    const Query = {
        tabla: 'producto',
        desc: true,
        columnas: ['nombre','sku','ID_subcategoria','ID_marca', 'descripcion', 'margen_ganancia', 'porcentaje_impuestos', 'vigilar', 'minimo_stock', 'perecedero'],
        foranea: {
            ID_subcategoria: {
                tabla:      'subcategoria',
                columnas:   ['nombre']
            },
            ID_marca: {
                tabla:      'marca',
                columnas:   ['nombre']
            }
        },
        pagina: 1
      };
    QueryDatabase( Query )
    .then((response) => res.send(response))
    .then(console.log('Elemento anadido exitosamente'))
    .catch((error) => console.log(error))
})


router.post('/productos/eliminar', (req, res) => {
    const sku = req.body.query;
    const Query = {
        tabla:  'producto',
        id:         sku
    }
    DeleteFromDatabase(Query)
    .then(res.send('OK'))
    .catch(res.status(404).end())
    console.log(sku)
})





module.exports = router;