import CreateConnection from './../CreateConnection/CreateConnection';
import mysql from 'mysql';
import HandleSchema from '../HandleSchema/HandleSchema';

/**
 * La función para actualizar información.
 *
 * @param Object Se manda el object con los parametros a actualizar. El .tabla esta reservado para el nombre de la tabla y .id para el ID a actualizar.
 * @returns
 */
const UpdateDatabase = ( obj ) => {
  return new Promise( async( resolve, reject ) => {
    try {
      // Si se intenta modificar el registro 0, da un error
      if(obj.id == 0) {
        throw new Error('904: No pueden editar el registro con ID 0');
      }

      //Crea el objeto para la conexión e importa el schema
      const connection = CreateConnection,
            schema = await HandleSchema()
            .then( sch =>  sch );

        //Revisa si existe la tabla
      if ( !schema.hasOwnProperty(obj.tabla) )
      {
        throw new Error('902: Esa tabla no existe en el schema');
      }

      //Asigna el nombre de la tabla al objeto
      obj.idname = schema[obj.tabla].id; 

      // Inicializa la query con el update
      let mysqlQuery = `update ${ obj.tabla } set `,
          columnaQuery = '';

      // Itera sobre todos los atributos a actualizar
      for( const columna in obj ) {
        if ( columna != 'tabla' && columna != 'id' && columna != 'idname'  ) {
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
      mysqlQuery = `${mysqlQuery} ${columnaQuery} where ${obj.idname} = ${obj.id}`;


      //Realiza la query. Si no hay error, resuelve con los resultados
      connection.query( mysqlQuery, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        else {
          resolve(results);
        }
      });
    }
    catch (error) {
      reject(error);
    }
  });
}

export default UpdateDatabase;
