import { join } from 'path';
import fs from 'fs';
import CreateConnection from '../CreateConnection/CreateConnection';
import InitializeDatabase from './InitializeDatabase';

const ResetDatabase = () => {
  
  // Crea la promesa para inicializar la base datos
  return new Promise(( resolve, reject ) => {


        
      const mysqlQueryDrop = fs.readFileSync( join( __dirname,  '../../ServerFiles/DropDB.sql'), "utf8"),
      connection = CreateConnection;


      // De lo contrario, procede a la segunda query
      connection.query(mysqlQueryDrop, (error, results, fields) => {
        // Devuelve el error si encuentra alguno
        if (error) {
          throw error;
        }

        InitializeDatabase()
          .then( () => resolve())
          .catch( () => reject());

        
      
    });
  });
}

export default ResetDatabase;
