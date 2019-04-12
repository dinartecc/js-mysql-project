import express from 'express';
import path from 'path';
import { json, urlencoded } from 'body-parser';
import UpdateSchema from './ServerComponents/UpdateSchema/UpdateSchema';
import CreateConnection from './ServerComponents/CreateConnection/CreateConnection'
import hbs from 'express-handlebars';
const app = express();

UpdateSchema();

/* ----- Configuraciones ----- */
app.set('views', path.join(__dirname,'/views'));

app.use('/public', express.static(path.join(__dirname, '/public'))); 

app.engine('.hbs',hbs({ //configurando handlebars
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'),'layouts'),
  partialsDir: path.join(app.get('views'),'partials'),
  extname: '.hbs'
}))

app.set('view engine', '.hbs');




app.use('/post', json());
app.use('/post', urlencoded({ extended: true }));
app.set('port', process.env.PORT || 4020)


/* ----- Rutas ----- */

app.use(require('./Routes/index.js'));
app.use(require('./Routes/prueba.js'));



app.get('/post', (req, res) => {
  const connection = CreateConnection;
  connection.connect();
  
  connection.query('SELECT * from saludo', (error, results, fields) => {

      console.log(results);
      console.log("------------------")
      console.log(fields);
  })
  res.send('nice!');
  connection.end();
  
  
});

/* ----- Server Running ----- */

app.listen(process.env.PORT || 4020, function() {
    console.log('Your node js server is running');
});
