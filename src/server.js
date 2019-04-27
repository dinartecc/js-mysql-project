import express from 'express';
import path from 'path';
import { json, urlencoded } from 'body-parser';
//import UpdateSchema from './ServerComponents/UpdateSchema/UpdateSchema';
//import CreateConnection from './ServerComponents/CreateConnection/CreateConnection'
import hbs from 'express-handlebars';
const app = express();

const socketio = require('socket.io')
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 4020;
//UpdateSchema();

//Middlewares
app.use(express.urlencoded({extended: true})); // Permite utilizar el req.




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


app.set('port', process.env.PORT || 4020)

/* ----- Rutas ----- */

app.use(require('./Routes/index.js'));


/* ----- Server Running ----- */

server.listen(PORT, function() {
    console.log('Your node js server is running');
});
