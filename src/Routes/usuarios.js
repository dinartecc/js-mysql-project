 const router = require('express').Router();
import QueryDatabase from '../ServerComponents/QueryDatabase/QueryDatabase'
import connection from '../ServerComponents/CreateConnection/CreateConnection';
router.post('/roles/add', (req, res) =>{
    console.log(req.body.data)
    const {Clasificacion, Lotes, Productos, Reportes, Usuarios, nombre} = req.body.data;

    //insert into Roles (productos, clasificacion, lotes, usuarios, reportes, `admin`, rol) values (5 ,5 ,5 ,5 , 5, 2, 'Administrador');
    connection.query(`INSERT into Roles (productos, clasificacion, lotes, usuarios, reportes, rol) values('${Productos}', '${Clasificacion}', '${Lotes}', '${Usuarios}', '${Reportes}', '${nombre}') `, function (error, results, fields){
        if (error) throw error;
        console.log(results)
        res.send('OK')
    })



})
router.post('/roles/edit', (req, res) =>{
    
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
    connection.query( `select * from roles`, (error, results, fields) => {

        let response = JSON.stringify(results)
        res.send(response)
    });
})


module.exports = router;