const express = require('express');
const app = express();
const path = require('path')
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(express.static('public'))
app.use('/post', bodyParser.json());
app.use('/post', bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 4020)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', (req, res) => {
  const connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'b7282d3c829f44',
    password : '49ad92bf',
    database : 'heroku_8e679e6d32fb43a'
  });
  connection.connect();
  const {Nombre, Apellidos, Cargo, Tratamiento, FechaNacimiento, FechaContratacion, Direccion, Ciudad, Region, CodPostal, Pais, TelDomicilio, Extension, Notas, Jefe} = req.body;
  
  connection.query('select IdEmpleado from empleados order by IdEmpleado desc limit 0, 1;', (error, results, fields) => {
    if (error) {
      res.status(400).send("unable to save to database");
      throw error;
      connection.end();
    }
    const newId = results[0].IdEmpleado + 1;
    const mysqlQuery = `INSERT INTO empleados ( IdEmpleado, Nombre, Apellidos, Cargo, Tratamiento, FechaNacimiento, FechaContratación, Dirección, Ciudad, Región, CódPostal, País, TelDomicilio, Extensión, Notas, Jefe)
                      values ( ${newId}, "${Nombre}", "${Apellidos}", "${Cargo}", "${Tratamiento}", "${FechaNacimiento}", "${FechaContratacion}",
                      "${Direccion}", "${Ciudad}", "${Region}", "${CodPostal}", "${Pais}", "${TelDomicilio}", ${Extension}, "${Notas}",
                      "${Jefe}");`;

                      connection.query(mysqlQuery, (error, results, fields) => {
                        if (error) {
                          res.status(400).send("unable to save to database");
                          throw error;
                          connection.end();
                        }
                        res.send("item saved to database");
                        connection.end();
                      });
            });

});

app.listen(process.env.PORT || 4020, function() {
    console.log('Your node js server is running');
});
