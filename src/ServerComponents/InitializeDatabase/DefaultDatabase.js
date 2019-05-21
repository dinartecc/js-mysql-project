import { join } from 'path';
import fs from 'fs';
import CreateConnection from '../CreateConnection/CreateConnection';
import ResetDatabase from './ResetDatabase';

const DefaultDatabase = () => {
  
  // Crea la promesa para inicializar la base datos
  return new Promise(( resolve, reject ) => {


        
      const mysqlQueryDefault = fs.readFileSync( join( __dirname,  '../../ServerFiles/DefaultValues.sql'), "utf8"),
      connection = CreateConnection;

      ResetDatabase()
          .then( () => {
            connection.query(mysqlQueryDefault, (error, results, fields) => {
              // Devuelve el error si encuentra alguno
              if (error) {
                reject (error);
                return null;
              }

              resolve();
      
              
              
            
          });
          })
          .catch( () => reject());


      // De lo contrario, procede a la segunda query
      
  });
}

export default DefaultDatabase;
