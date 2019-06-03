import AddToDatabaseCreateQuery from './AddToDatabaseCreateQuery';
import CreateConnection from './../CreateConnection/CreateConnection';
import GenerateSKU from '../GenerateSKU/GenerateSKU';

/**
 * La función genérica para añadir un producto a la base de datos.
 *
 * @param Object Se envia todas las propiedades correspondientes a los campos de la tabla producto, excepto el campo de sku. La propiedad .tabla de ser 'producto para verificar
 * @returns
 */
const AddToProduct = ( obj ) => {
  return new Promise( async ( resolve, reject ) => {
    try {


      if ( obj.tabla != 'producto' )
      {
        throw new Error('907: No es la tabla producto');
      }

      const sku = await GenerateSKU(obj);
      obj.sku = sku;
        

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

export default AddToProduct;
