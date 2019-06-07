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
      const connection = CreateConnection,
            fecha = new Date();;

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

         if(obj.tabla == 'lotes')
         {
           console.log(results);
           const queryMovimiento = `insert into movimientos (user, ID_lotes, SKU, tipo, fecha, cantidad ) 
           values ('${obj.usernameMov}', (Select ID_lotes from lotes order by ID_lotes desc limit 1) ,'${obj.sku}', 
          3, '${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}', ${obj.cantidad});`
           
          connection.query(queryMovimiento); 
           
         }
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
