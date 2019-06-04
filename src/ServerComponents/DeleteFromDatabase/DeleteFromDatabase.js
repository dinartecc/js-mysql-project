import CreateConnection from './../CreateConnection/CreateConnection';
import HandleSchema from '../HandleSchema/HandleSchema'

/**
 * La función para borrar una base de dato.
 *
 * @param Object Se manda .id con el ID de la tabla y .tabla con el nombre de la tabla.
 * @returns
 */
const DeleteFromDatabase = ( obj  ) => {
  return new Promise( async( resolve, reject ) => {

    if(obj.id == 0) {
      throw new Error('903: No pueden borrar el registro con ID 0');
    }

    //Crea el objeto para la conexión e importa el schema
    const connection = CreateConnection,
          schema = await HandleSchema()
          .then( sch =>  sch )
          .catch( err => {throw err});;

      if ( !schema.hasOwnProperty(obj.tabla) )
      {
        throw new Error('902: Esa tabla no existe en el schema');
      }
  
      obj.idname = schema[obj.tabla].id; 

    //Checkea si la tabla tiene hijos foreign keys
    connection.query(`select TABLE_NAME from INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    where REFERENCED_TABLE_SCHEMA = '${process.db.database}' AND REFERENCED_TABLE_NAME = '${obj.tabla}';`, (error, results, fields) => {
      if (error) {
        reject(error);
        return null;
      }
      //Si hay tablas hijos, inicializa este codigo
      if ( results.length > 0 ) {

        
          let changeQuery = '';
          //Crea el query con cada tabla hijo para actualizar el id al 0
          for( let child of results ) {
            changeQuery += `update ${ child.TABLE_NAME } set ${ obj.idname } = 0 where ${ obj.idname } = ${ obj.id }; \n`;
          }

          //Si hay children tables, cambia las foreign keys a 0
          if ( changeQuery != '' ){
            connection.query( changeQuery, (error, results, fields) => {
              if(error) {
                reject(error);
              }
            });
          }

        
      }

      //Crea la query para borrar el registro
      let deleteQuery = `update ${obj.tabla} set borrado = true where ${obj.idname} = '${obj.id}'`;

      //Ejecuta la query
      connection.query( deleteQuery, (error, results, fields) => {
        if (error) {
          reject( error );
          return null;
        }

        resolve(results);

      });
    });    
  });
};

export default DeleteFromDatabase;
