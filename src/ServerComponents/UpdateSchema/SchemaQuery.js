import CreateConnection from '../CreateConnection/CreateConnection';
import fs  from 'fs';
import path from 'path';


/**
 *Funcion que hace una query a la base de datos para obtener una copia del schema en formato json.
 *
 */
const SchemaQuery = () => {
  return new Promise(( resolve, reject ) => {

    //Se crea el string de la query y el objeto de a conexion
    const mysqlQuery = `select TABLE_NAME, COLUMN_NAME, DATA_TYPE from Information_schema.columns where TABLE_SCHEMA = 'heroku_8e679e6d32fb43a'`,
          connection  = CreateConnection;

    connection.connect();

    // Se realiza la query
    connection.query( mysqlQuery, (error, results, fields) => {

      connection.end();

      if (error) reject(new Error(error));

      //Si no hubo error, se hace un objeto schema, donde cada nombre de la tabla es una 
      //propiedad del objeto, y cada columna es una propiedad anidada con el tipo de dato que es.
      const schema = {};

      for( let tupla of results ) {
        if( !(tupla.TABLE_NAME in schema )) {
          schema[tupla.TABLE_NAME] = {};
        }
        schema[tupla.TABLE_NAME][tupla.COLUMN_NAME] = tupla.DATA_TYPE;
      }

      //Se guarda la ultima vez que se actualizo el schema
      schema.lastUpdate = Date.now();
      
      //Se guarda el schema en formato JSON
      fs.writeFile( path.join( __dirname, '../../ServerFiles/Schema.json'), JSON.stringify(schema), (err) => {

        if (error) reject(new Error(err));

      })

      resolve(null);

    });

  })
}

export default SchemaQuery;
