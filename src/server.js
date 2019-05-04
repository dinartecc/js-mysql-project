import express from 'express';
import path from 'path';
import session from 'express-session'
import fs from 'fs'
import bodyParser from 'body-parser'
import hbs from 'express-handlebars';
const MySQLStore = require('express-mysql-session')(session);



const connection = JSON.parse(fs.readFileSync(path.join(__dirname, 'ServerFiles/dbCredentials.json')));
const sessionStore = new MySQLStore(connection);


const app = express();
const PORT = process.env.PORT || 4020;
//UpdateSchema();



//Middlewares
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true})); // Permite utilizar el req.

app.use(session({ //Configuracion del express-sessions
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: true
}));




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
app.use(require('./Routes/clientes.js'));
app.use(require('./Routes/auth.js'));
app.use(require('./Routes/categorias.js'));


/* ----- Server Running ----- */
app.listen(5050, function() {
    console.log('Your node js server is running');
});
