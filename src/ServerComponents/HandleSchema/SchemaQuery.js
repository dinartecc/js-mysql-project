import CreateConnection from '../CreateConnection/CreateConnection';
import fs  from 'fs';
import path from 'path';




/**
 *Funcion que hace una query a la base de datos para obtener una copia del schema en formato json.
 *
 */
const SchemaQuery =  () => {
  return new Promise( ( resolve, reject ) => {

    //Se crea el string de la query y el objeto de a conexion
    const mysqlQuery = `select TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, COLUMN_KEY from Information_schema.columns where TABLE_SCHEMA = '${process.db.database}'`,
          connection  = CreateConnection;


    // Se realiza la query
      connection.query( mysqlQuery, (error, results, fields) => {
        //Si no hubo error, se hace un objeto schema, donde cada nombre de la tabla es una 
        //propiedad del objeto, y cada columna es una propiedad anidada con el tipo de dato que es.

        if (error) throw error;
        
        const schema = {};

        
        for( let tupla of results ) {
          // Si aun no se ha creado la propiedad, se crea
          if( !(tupla.TABLE_NAME in schema )) {
            schema[tupla.TABLE_NAME] = {};
          }
          //Pone cada propiedad anidada, que corresponde a la columna, con su respectivo tipo
          schema[tupla.TABLE_NAME][tupla.COLUMN_NAME] = {};
          switch (tupla.DATA_TYPE) {
            case 'int':
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].tipo = 'int';
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].longitud = tupla.NUMERIC_PRECISION;
              break;
            case 'decimal':
              schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].tipo = 'moneda';
              schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].longitud = tupla.NUMERIC_PRECISION;
              break;
            case 'date':
              schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].tipo = 'fecha';
              schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].longitud = 11;
              break;
            case 'tinyint':
              schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].tipo = 'boolean';
              break;
            case 'varchar':
            case 'char':
              schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].tipo = tupla.DATA_TYPE;
              schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].longitud = tupla.CHARACTER_MAXIMUM_LENGTH;
             break;
          }

          //Si la columna es la llave primaria de la tabla, se guarda dentro de la propiedad id
          if ( tupla.COLUMN_KEY == 'PRI' ) {
            schema[tupla.TABLE_NAME].id = tupla.COLUMN_NAME;
          }

        }

        //Se guarda la ultima vez que se actualizo el schema
        schema.lastUpdate = Date.now();
        
        //Se guarda el schema en formato JSON
        fs.writeFile( path.join( __dirname, '../../ServerFiles/Schema.json'), JSON.stringify(schema), (err) => {

          if (err) throw error;

        })
        resolve (schema);
      });

    });
  

   

}

export default SchemaQuery;
