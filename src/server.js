import express from 'express';
import path from 'path';

import { json, urlencoded } from 'body-parser';
//import UpdateSchema from './ServerComponents/UpdateSchema/UpdateSchema';
import CreateConnection from './ServerComponents/CreateConnection/CreateConnection'
import hbs from 'express-handlebars';
const app = express();

const socketio = require('socket.io')
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 4020;
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


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


//app.use('/post', json());                         ---  No se si hiciste esto por alguna razon pero ahi lo dejo ---
//app.use('/post', urlencoded({ extended: true })); ---  No se si hiciste esto por alguna razon pero ahi lo dejo ---
app.set('port', process.env.PORT || 4020)

/* ----- Rutas ----- */


/*
io.on('connection', function(socket){
  console.log(`client: ${socket.id}`)
  //enviando numero aleatorio cada dos segundo al cliente
  setInterval(() => {
    socket.emit('server/random', Math.random())
  }, 2000)
  //recibiendo el numero aleatorio del cliente
  socket.on('client/random', (num) => {
    console.log(num)
  })
})*/






app.use(require('./Routes/index.js'));
app.use(require('./Routes/prueba.js'));
/* ----- Server Running ----- */

server.listen(PORT, function() {
    console.log('Your node js server is running');
});
