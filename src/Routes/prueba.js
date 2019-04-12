const router = require('express').Router();

import CreateConnection from '../ServerComponents/CreateConnection/CreateConnection'
router.get('/post', (req, res) => {
    const connection = CreateConnection;
    connection.connect();
    //Aqui hace tus pruebas chanchas
    connection.query('SELECT * from saludo', (error, results, fields) => {
  
        console.log(results);
        console.log("------------------")
        console.log(fields);
    })
    res.send('nice!');
    connection.end();
    
    
  });
module.exports = router;