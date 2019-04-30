import AddToDatabaseCreateQuery from './AddToDatabaseCreateQuery';
import CreateConnection from './../CreateConnection/CreateConnection';

/**
 * La función genérica para añadir un objeto a la base de datos.
 *
 * @param Object Cada propiedad del objeto representa un conjunto columna/valor. La propiedad tabla esta reservada para el nombre de la tabla
 * @returns
 */
const AddToDatabase = ( obj ) => {
  return new Promise(( resolve, reject ) => {

    //Crea el objeto para la conexión
    const connection = CreateConnection;

    //Realiza la query
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
