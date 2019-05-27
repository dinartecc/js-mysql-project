 const router = require('express').Router();
import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase'
import connection from '../ServerComponents/CreateConnection/CreateConnection';
import UpdateDatabase from '../ServerComponents/UpdateDatabase/UpdateDatabase';


router.post('/roles/add', (req, res) =>{
    console.log(req.body)
    const [Clasificacion, Lotes, Productos, Reportes, Usuarios] = req.body.data;
    const {nombre} = req.body.info;
    console.log(Clasificacion)
    //insert into Roles (productos, clasificacion, lotes, usuarios, reportes, `admin`, rol) values (5 ,5 ,5 ,5 , 5, 2, 'Administrador');
    connection.query(`INSERT into Roles (productos, clasificacion, lotes, usuarios, reportes, rol) values('${Productos}', '${Clasificacion}', '${Lotes}', '${Usuarios}', '${Reportes}', '${nombre}') `, function (error, results, fields){
        if (error) throw error;
        console.log(results)
        res.send('OK')
    })
})
router.post('/roles/edit', (req, res) =>{
    const [Clasificacion, Lotes, Productos, Reportes, Usuarios] = req.body.data;
    const {nombre, id} = req.body.info;

    const Query = {
        tabla: 'roles',
        id,
        clasificacion:  Clasificacion,
        lotes:          Lotes,
        productos:      Productos,
        reportes:       Reportes,
        usuarios:       Usuarios,
        rol:            nombre
    }

    UpdateDatabase( Query )
    .then((response) => {
        console.log(`Se ha actualizado el registro ${id} de la tabla Roles`)
        res.send('Actualizado Exitosamente!')
    })
    .catch((error) => {
        console.log(error)
        res.status(404).end();
    })

})

router.get('/getusers', (req, res) => {
    const Query = {
        tabla: 'usuarios',
        desc: true,
        columnas: ['id','name','ID_rol'],
        foranea: {
          ID_rol: {
            tabla: 'roles',
            columnas: ['rol']
          }
        }
      };
    QueryDatabase( Query )
    .then((response)=> {
        response = JSON.stringify(response)
        console.log(response)
        res.json(response)
    })
    .catch((response) => {
        console.log(response)
    })
})


router.get('/getroles', (req, res) => {

    const Query = {
        tabla: 'roles',
        columnas: ['id', 'rol', 'productos', 'clasificacion', 'lotes', 'usuarios', 'reportes', 'administrador']
    }


    QueryDatabase( Query )
    .then((response) => {
        console.log(JSON.stringify(response))
        res.send(JSON.stringify(response))
    })
    /*connection.query( `select * from roles`, (error, results, fields) => {

        let response = JSON.stringify(results)
        res.send(response)
    });*/
})


module.exports = router;