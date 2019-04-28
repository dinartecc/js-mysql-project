import { join } from 'path';
import fs from 'fs';
import  CreateConnection from '../CreateConnection/CreateConnection';

const InitializeDatabase = () => {
  
  // Crea la promesa para inicializar la base datos
  return new Promise(( resolve, reject ) => {

    //Se crea el string de la query con el archivo InitDB.sql y el objeto de a conexion
    let mysqlQuery = fs.readFileSync( join( __dirname, '../../ServerFiles/InitDB.sql'), "utf8"),
          connection  = CreateConnection;

          
    connection.query(mysqlQuery, (error, results, fields) => {

      // Devuelve el error si encuentra alguno
      if (error) {
        reject( error );
      }

      // De lo contrario
      resolve(  );    
    });

  })


}

export default InitializeDatabase;
