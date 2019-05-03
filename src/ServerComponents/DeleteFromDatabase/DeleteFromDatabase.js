import AddToDatabaseCreateQuery from './AddToDatabaseCreateQuery';
import CreateConnection from './../CreateConnection/CreateConnection';

/**
 * La función genérica para añadir un objeto a la base de datos.
 *
 * @param Object Cada propiedad del objeto representa un conjunto columna/valor. La propiedad tabla esta reservada para el nombre de la tabla
 * @returns
 */
const DeleteFromDatabase = ( obj ) => {
  return new Promise(( resolve, reject ) => {

    //Crea el objeto para la conexión
    const connection = CreateConnection;

    //Checkea si la tabla tiene hijos foreign keys
    connection.query(`select TABLE_NAME from INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    where REFERENCED_TABLE_SCHEMA = 'heroku_8e679e6d32fb43a' AND REFERENCED_TABLE_NAME = '${obj.tabla}';`, (error, results, fields) => {
      if (error) {
        throw error;
      }
      if ( results.length > 0 ) {
        
      }
    });

    
    AddToDatabaseCreateQuery( obj )
    .then( query => connection.query( query, (error, results, fields) => {

      // Si hay un error, devuelve la promesa fallida
      if (error) {
        console.log(error);
        reject(error);
      }

      // De lo contrario, devuelve los resultados
      resolve(results);

    }))

    
    
  });
};

export default AddToDatabase;
