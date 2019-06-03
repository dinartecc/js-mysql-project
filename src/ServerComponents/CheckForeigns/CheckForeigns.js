import CreateConnection from './../CreateConnection/CreateConnection';
import HandleSchema from '../HandleSchema/HandleSchema';

/**
 * Para checkear si la tupla a la que se desea apuntar como llave foranea en editar o agregar esta borrada.
 *
 * @param Object Se manda el object con los parametros a checkear. 
 * @returns
 */
const CheckForeigns = ( obj ) => {
  return new Promise( async( resolve, reject ) => {
    try {
      //Crea el objeto para la conexión e importa el schema
      const connection = CreateConnection,
            schema = await HandleSchema()
            .then( sch =>  sch );
      let mysqlQuery = '',
          campoFirst = '',
          count = 0;

      for( let campo in obj ) {
        campoFirst = campo.substr(0,3);
        if ( campoFirst === 'ID_' || (campoFirst === 'SKU' && obj.tabla != 'producto'))
        {
          mysqlQuery += `SELECT borrado from ${schema[obj.tabla][campo].foranea} where ${schema[schema[obj.tabla][campo].foranea].id} = ${obj[campo]};\n`
        }
      }

      if (mysqlQuery === '') {
        resolve('2');
      }

      connection.query( mysqlQuery, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        else {
          // checkea si las tablas referenciadas estan borradas
          let check = true;
          for( const resultado of results) {
            if ( count == 1 ) {
              if(resultado[0].borrado == 1) {
                check = false;
              }
            }
            else {
              if(resultado.borrado == 1) {
                check = false;
              }
            }
            
          }
          if (check) {

            resolve();
          }
          else {
            reject(new Error('Una llave foranea apuntaba a una tupla borrada'));
          }
        }
      });

    }
    catch (error) {
      reject(error);
    }
  });
}

export default CheckForeigns;
