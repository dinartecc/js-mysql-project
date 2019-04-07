import express from 'express';
import { join } from 'path';
import { json, urlencoded } from 'body-parser';
import UpdateSchema from './ServerComponents/UpdateSchema/UpdateSchema';
import CreateConnection from './ServerComponents/CreateConnection/CreateConnection'

const app = express();

UpdateSchema();

app.use(express.static('public'))
app.use('/post', json());
app.use('/post', urlencoded({ extended: true }));
app.set('port', process.env.PORT || 4020)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.post('/post', (req, res) => {
  connection.connect();
  
  
  
});

app.listen(process.env.PORT || 4020, function() {
    console.log('Your node js server is running');
});
