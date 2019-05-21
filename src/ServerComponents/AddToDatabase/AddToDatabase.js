import AddToDatabaseCreateQuery from './AddToDatabaseCreateQuery';
import CreateConnection from './../CreateConnection/CreateConnection';
import HandleSchema from '../HandleSchema/HandleSchema';

/**
 * La función genérica para añadir un objeto a la base de datos.
 *
 * @param Object Cada propiedad del objeto representa un conjunto columna/valor. La propiedad .tabla esta reservada para el nombre de la tabla. La propiedad .id esta reservada pero no se envia.
 * @returns
 */
const AddToDatabase = ( obj ) => {
  return new Promise( async ( resolve, reject ) => {
    try {

      const schema = await HandleSchema()
                  .then( sch =>  sch )
                  .catch( err => {throw err}); 

      if ( !schema.hasOwnProperty(obj.tabla) )
      {
        throw new Error('902: Esa tabla no existe en el schema');
      }

      obj.id = schema[obj.tabla].id; 

      //Crea el objeto para la conexión
      const connection = CreateConnection;

      //Realiza la query
      AddToDatabaseCreateQuery( obj )
      .then( query => connection.query( query, (error, results, fields) => {

        // Si hay un error, devuelve la promesa fallida
        if (error) {
          reject(error);
        }
        else {
          // De lo contrario, devuelve los resultados
         resolve(results);
         return false;
        }
      }));

    }
    catch (error) {
      reject(error);
    }
    
  });
};

export default AddToDatabase;
