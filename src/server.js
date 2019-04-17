import express from 'express';
import path from 'path';
import { json, urlencoded } from 'body-parser';
//import UpdateSchema from './ServerComponents/UpdateSchema/UpdateSchema';
import CreateConnection from './ServerComponents/CreateConnection/CreateConnection'
import hbs from 'express-handlebars';
const app = express();

//UpdateSchema();

//Middlewares
app.use(express.urlencoded({extended: true})); // Esto reemplaza lo que esta en la linea 36 y 37




/* ----- Configuraciones ----- */
app.use(express.static(path.join(__dirname, '../public')));  // Al parecer esto no funcionaba  xdd
app.set('views', path.join(__dirname,'/views'));



/* ----- Configurando handlebars ----- */
app.engine('.hbs',hbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'),'layouts'),
  partialsDir: path.join(app.get('views'),'partials'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs');





//app.use('/post', json());                         ---  No se si hiciste esto por alguna razon pero ahi lo dejo ---
//app.use('/post', urlencoded({ extended: true })); ---  No se si hiciste esto por alguna razon pero ahi lo dejo ---
app.set('port', process.env.PORT || 4020)

/* ----- Rutas ----- */

app.use(require('./Routes/index.js'));
app.use(require('./Routes/prueba.js'));


/* ----- Server Running ----- */

app.listen(process.env.PORT || 4020, function() {
    console.log('Your node js server is running');
});
