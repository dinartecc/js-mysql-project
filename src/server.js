import express from 'express';
import path from 'path';

//import UpdateSchema from './ServerComponents/UpdateSchema/UpdateSchema';
//import CreateConnection from './ServerComponents/CreateConnection/CreateConnection'
import hbs from 'express-handlebars';
const app = express();
const PORT = process.env.PORT || 4020;
//UpdateSchema();

//Middlewares
app.use(express.urlencoded({extended: true})); // Permite utilizar el req.

/* ----- Configuraciones ----- */
app.use(express.static(path.join(__dirname, '../public')));  // Al parecer esto no funcionaba  xdd
app.set('views', path.join(__dirname,'/Views'));



/* ----- Configurando handlebars ----- */
app.engine('.hbs',hbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'),'layouts'),
  partialsDir: path.join(app.get('views'),'partials'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs');



/* ----- Rutas ----- */

app.use(require('./Routes/index.js'));
app.use(require('./Routes/categorias.js'));


/* ----- Server Running ----- */
app.listen(5050, function() {
    console.log('Your node js server is running');
});
