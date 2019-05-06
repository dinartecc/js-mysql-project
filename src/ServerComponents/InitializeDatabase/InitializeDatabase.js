import { join } from 'path';
import fs from 'fs';
import CreateConnection from '../CreateConnection/CreateConnection';

const InitializeDatabase = () => {
  
  // Crea la promesa para inicializar la base datos
  return new Promise(( resolve, reject ) => {

    //Se crea el string de la query con el archivo InitDB.sql y el objeto de a conexion
    const mysqlQueryInit = fs.readFileSync( join( __dirname, '../../ServerFiles/InitDB.sql'), "utf8"),
          mysqlQueryDrop = fs.readFileSync( join( __dirname,  '../../ServerFiles/DropDB.sql'), "utf8"),
          mysqlQueryValues = fs.readFileSync( join( __dirname, '../../ServerFiles/SetDeleteValues.sql'), "utf8"),
          connection = CreateConnection;

          
   

      // Devuelve el error si encuentra alguno
      
      
      // De lo contrario, procede a la segunda query
      connection.query(mysqlQueryDrop, (error, results, fields) => {
        // Devuelve el error si encuentra alguno
        if (error) {
          throw error;
        }

        connection.query(mysqlQueryInit, (error, results, fields) => {

          // Devuelve error si encuentra alguno
          if (error) {
            throw error;
          }

          connection.query(mysqlQueryValues, (error, results, fields) => {

            // Devuelve error si encuentra alguno
            if (error) {
              throw error;
            }
  
            // Si todo ocurre bien, manda la resolucion
            resolve(results);
  
          })
        })
        
      });
    
    
  });
}

export default InitializeDatabase;
