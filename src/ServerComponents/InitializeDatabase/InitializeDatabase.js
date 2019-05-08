import { join } from 'path';
import fs from 'fs';
import CreateConnection from '../CreateConnection/CreateConnection';
import CreateDatabase from './CreateDatabase';

const InitializeDatabase = () => {
  
  // Crea la promesa para inicializar la base datos
  return new Promise(( resolve, reject ) => {

    CreateDatabase().then(()=>{
          //Se crea el string de la query con el archivo InitDB.sql y el objeto de a conexion
        const mysqlQueryInit = fs.readFileSync( join( __dirname, '../../ServerFiles/InitDB.sql'), "utf8"),
        mysqlDefault = fs.readFileSync( join( __dirname,  '../../ServerFiles/DefaultUser.sql'), "utf8"),
        connection = CreateConnection;

        




      connection.query(mysqlQueryInit, (error, results, fields) => {

        // Devuelve error si encuentra alguno
        if (error) {
          throw error;
        }
        connection.query(`select count(*) as count from usuarios`, (error, results, fields) => {

          // Devuelve error si encuentra alguno
          if (error) {
            throw error;
          }


          if ( results[0].count == 0 ) {
            connection.query(mysqlDefault, (error, results, fields) => {

              // Devuelve error si encuentra alguno
              if (error) {
                throw error;
              }
      
              resolve(results);
      
            });
          } 
          else {
            resolve(results);
          }
  
        });


      });
      

    })
    .catch( error => {throw error} );
    
  });
}

export default InitializeDatabase;
