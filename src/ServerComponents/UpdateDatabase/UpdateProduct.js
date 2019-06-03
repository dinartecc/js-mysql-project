import CreateConnection from './../CreateConnection/CreateConnection';
import mysql from 'mysql';
import GenerateSKU from '../GenerateSKU/GenerateSKU';

/**
 * La función para actualizar información de un producto. Retorna el SKU resultante despues del update.
 *
 * @param Object Se manda el object con los parametros a actualizar. El .tabla esta reservado para el nombre de la tabla. Se debe de mandar el .SKU
 * @returns {String} SKU
 */
const UpdateProduct = ( obj ) => {
  return new Promise( async( resolve, reject ) => {
    try {
      // Si se intenta modificar el registro 0, da un error
      if(obj.SKU == '00000000000') {
        throw new Error('904: No pueden editar el registro con ID 0');
      }

      if ( obj.tabla != 'producto' )
      {
        throw new Error('907: No es la tabla producto');
      }
      console.log(obj.SKU);

      const connection = CreateConnection,
            oldSku = obj.SKU,
            oldSub = obj.SKU.substr(0,3),
            oldMar = obj.SKU.substr(3,3);
      if (parseInt(oldSub) != obj.ID_subcategoria || parseInt(oldMar) != obj.ID_marca ) {
        obj.SKU = await GenerateSKU(obj);
      }
      

      // Inicializa la query con el update
      let mysqlQuery = `update ${ obj.tabla } set `,
          columnaQuery = '';

      // Itera sobre todos los atributos a actualizar
      for( const columna in obj ) {
        if ( columna != 'tabla'  ) {
          columnaQuery += `${columna} = ${mysql.escape(obj[columna])} , `;
        }
      }

      // Si no encontro ningun atributo, devuelve error con update vacío
      if( columnaQuery == '' ) {
        throw new Error('905: Mandaron un update vacío');
      }

      // Quita la coma extra al final
      columnaQuery = columnaQuery.substr (0, columnaQuery.length-2);

      // Une la query inicial, los atributos a actualizar, y la condicion where del ID
      mysqlQuery = `${mysqlQuery} ${columnaQuery} where SKU = ${oldSku}`;


      //Realiza la query. Si no hay error, resuelve con los resultados
      connection.query( mysqlQuery, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        else {
          resolve(obj.SKU);
        }
      });
    }
    catch (error) {
      reject(error);
    }
  });
}

export default UpdateProduct;
