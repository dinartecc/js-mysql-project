import { createPool } from 'mysql';
import { join } from 'path';
import fs from 'fs';

// Utiliza crea un objeto de conexion utilizando las credenciales de la base de datos
console.log('Estableciendo conexión con la base de datos...')
const credentials = JSON.parse(
  fs.readFileSync(join(__dirname, '../../ServerFiles/dbCredentialsLocal.json'))
  );


process.db = credentials;


const connection = createPool( credentials );

export default connection;
