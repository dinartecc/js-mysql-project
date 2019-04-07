import path from 'path';
import fs from 'fs';
import SchemaQuery from './SchemaQuery';

/**
 * Actualiza el schema local de la base de datos
 *
 * @param {boolean} [forced=false] Si se desea forzar una actualizacion del schema
 */
const UpdateSchema = ( forced = false ) => {

  //Lee el archivo local del schema
  fs.readFile( path.join( __dirname, '../../ServerFiles/Schema.json' ), 'utf8', ( err, data ) => {

    //Si el archivo no existe o si se fuerza el update, se ejecuta SchemaQuery
    if ( err || forced  ) {

      SchemaQuery()
        .catch( error => console.log( error ) );

      return undefined;
    }
    
    // Si el archivo existe, chequea la ultima vez que se actualizo el schema. 
    // Si fue hace mas de 30 min, se actualiza el schema.
    if( JSON.parse(data).lastUpdate + 1800000 < Date.now() ) {
      SchemaQuery()
        .catch( error => console.log( error ) );
    }
    
  });
};

export default UpdateSchema;
