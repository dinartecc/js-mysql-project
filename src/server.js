import '@babel/polyfill';
import express from 'express';
import path from 'path';
import session from 'express-session'
import fs from 'fs'
import bodyParser from 'body-parser'
import hbs from 'express-handlebars';
import InitializeDatabase from './ServerComponents/InitializeDatabase/InitializeDatabase';
import graphqlHTTP from 'express-graphql';
var { buildSchema } = require('graphql');


const MySQLStore = require('express-mysql-session')(session);
const expireTime = 6000000;

import CreateConnection from './ServerComponents/CreateConnection/CreateConnection';

InitializeDatabase()
  .then( () => {
const sessionStore = new MySQLStore({ // Esta configuracion es para la sesiones en el backend
  clearExpired: true, // Limpiar los registros de las sesiones ya expiradas
  createDatabaseTable: true, // Si no existe la tabla sessions en la base de datos, la crea
  checkExpirationInterval: expireTime, // How frequently expired sessions will be cleared; milliseconds:
  expiration: expireTime // The maximum age of a valid session; milliseconds. 
}, CreateConnection);

//Configuraciones
const app = express();
const PORT = process.env.PORT || 5051;


app.use(session({ //Configuracion del express-sessions
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  cookie: {maxAge: expireTime }, // Despues de este tiempo, el cookie va a vencer.
  saveUninitialized: false 
}));




//UpdateSchema();



//Middlewares
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true})); // Permite utilizar el req.

/*
app.use((req, res, next) => {

  if(typeof req.session.user === 'undefined' && req.path !== '/login') {
    res.render('login.hbs', {layout: 'login'});
  }
  else{
    next();
  }
});

*/

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

// GRAPHQL TEST

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));





app.use(require('./Routes/index.js'));
app.use(require('./Routes/clientes.js'));
app.use(require('./Routes/auth.js'));
app.use(require('./Routes/clasificacion.js'));


/* ----- Server Running ----- */
app.listen(PORT, function() {
    console.log('Your node js server is running');
});
  }
    
)
.catch (error => {console.log(error); throw error;} );


