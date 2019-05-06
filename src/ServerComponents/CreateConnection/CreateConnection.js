import { createPool } from 'mysql';
import { join } from 'path';
import fs from 'fs';

// Utiliza crea un objeto de conexion utilizando las credenciales de la base de datos

const connection = createPool( JSON.parse(
                                      fs.readFileSync(join(__dirname, '../../ServerFiles/dbCredentials.json'))
                                      ));

export default connection;
