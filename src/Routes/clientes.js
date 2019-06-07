const router = require('express').Router();

import AddToDatabase from '../ServerComponents/AddToDatabase/AddToDatabase';
import UpdateDatabase from '../ServerComponents/UpdateDatabase/UpdateDatabase';
import DeleteFromDatabase from '../ServerComponents/DeleteFromDatabase/DeleteFromDatabase';
import CreateConnection from '../ServerComponents/CreateConnection/CreateConnection';
import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase';
import AddToProduct from '../ServerComponents/AddToDatabase/AddToProduct';
import CheckForeigns from '../ServerComponents/CheckForeigns/CheckForeigns';
import UpdateProduct from '../ServerComponents/UpdateDatabase/UpdateProduct';
import GetMovimientos from '../ServerComponents/GetMovimientos/GetMovimientos';
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
    const {marca,subcategoria, margen, impuesto, nombre, descripcion, minimoStock, vigilar, perecedero, sku, dias_antes_vencimiento} = req.body.query;
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
        SKU:                    sku,
        dias_antes_vencimiento: dias_antes_vencimiento
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
    console.log(req.body.query);
    const {marca,subcategoria, margen, impuesto, nombre, descripcion, minimoStock, vigilar, perecedero, dias_antes_vencimiento} = req.body.query;
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
        dias_antes_vencimiento: dias_antes_vencimiento
    }

    if(nombre !== ''){
        
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
    
    const Query = {
        tabla: 'producto',
        id:  sku
    }
    
    DeleteFromDatabase( Query )
    .then(res.send('OK'))
    .catch(e => console.log(e))
})


router.post('/productos/info', (req, res) => {
    const {pagina, busqueda} = req.body;
    const Query = {
        tabla: 'producto',
        desc: true,
        columnas: ['nombre','sku','ID_subcategoria','ID_marca', 'descripcion', 'margen_ganancia', 'porcentaje_impuestos', 'vigilar', 'minimo_stock', 'perecedero', 'dias_antes_vencimiento'],
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
        pagina: pagina
      };
      
    QueryDatabase( Query )
    .then((response) => res.send(response))
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
    
})

router.post('/productos/buscar/',async (req, res) =>{
  
    let {tabla, busqueda, tipo, pagina} = req.body;

    
    
    const Query = {
        tabla:  tabla,
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
        desc: true, 
        limite: 10,
        //PAGE: poner esto en el router de buscar
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



router.post('/productos/sku', (req, res) => {
    
    const {sku} = req.body
    const Query = {
        tabla: 'producto',
        columnas: ['perecedero'],
        condiciones: {
            sku
        }
    }
    QueryDatabase( Query )
    .then((response) => res.json(response.body[0]))
    .catch(error => console.log(error))
})


router.post('/lotes/nuevo' , (req, res) => {
    let {valor, almacen, pasillo, estante, perecedero, fecha_caducidad, fecha_ingreso, sku, cantidad} = req.body.query
    
    if(!perecedero){ 
        const x = new Date();
        fecha_caducidad = `${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}`
    }

    const Query = {
        tabla: 'lotes',
        costo: valor,
        ID_almacen: almacen,
        pasillo,
        estante,
        fecha_caducidad,
        fecha_ingreso,
        sku,
        cantidad,
        usernameMov : req.session.user.user
    }

    AddToDatabase( Query )
    .then(() => res.send('OK'))
    .catch((error) => console.log(error))
})



router.post('/lotes/buscar' , (req, res) => {
    let {tabla, busqueda, tipo, pagina} = req.body;
    const Query = {
        tabla:  tabla,
        columnas: ['id', 'sku', 'cantidad', 'fecha_ingreso', 'costo','ID_almacen', 'pasillo','fecha_caducidad'],
        foranea: {
            sku: {
                tabla: 'producto',
                columnas: ['nombre']
            },
            ID_almacen: {
                tabla: 'almacen',
                columnas: ['nombre']
            }
        },
        desc: true, 
        limite: 10,
        pagina: pagina || 0
        
    }
    Query.condiciones = {}
    Query.condiciones[tipo] = busqueda;
    Query.condiciones.marcarSalida = '0';
    QueryDatabase( Query )
    .then((response) => {
        
        res.send(JSON.stringify(response));
    })
    .catch((error) => {
        console.log(error)
        res.status(404).end()
    })
})

router.post('/movimientos/buscar' , (req, res) => {
  let {tabla, busqueda, tipo, pagina} = req.body;
  const Query = {
      tabla:  tabla,
      columnas: ['id', 'user', 'SKU', 'tipo', 'fecha', 'cantidad'],
      desc: true, 
      limite: 10,
      pagina: pagina || 0
      
  }
  Query.condiciones = {}
  Query.condiciones[tipo] = busqueda;
  QueryDatabase( Query )
  .then((response) => {  
      for( let tupla in response.body ) {
        const fecha = response.body[tupla].fecha;
        response.body[tupla].fecha = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
      }
      res.send(JSON.stringify(response));
  })
  .catch((error) => {
      console.log(error)
      res.status(404).end()
  })
});

router.post('/movimientos/sumas' , (req, res) => {
  

  console.log(req.body);
  let {filtroFecha, filtroSKU} = req.body;
  if (filtroSKU == '') filtroSKU = 'none';
  const obj = {
    filtroFecha: filtroFecha,
    filtroSKU: filtroSKU || 'none'
  }

  GetMovimientos(obj)
  .then((response) => {  
      for( let tupla in response.body ) {
        const fecha = response.body[tupla].fecha;
        response.body[tupla].fecha = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
      }
      res.send(JSON.stringify(response));
  })
  .catch((error) => {
      console.log(error)
      res.status(404).end()
  })
});

module.exports = router;
