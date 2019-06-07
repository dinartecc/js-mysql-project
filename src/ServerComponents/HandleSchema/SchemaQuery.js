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
    const mysqlQueryColumns = `select TABLE_NAME, COLUMN_NAME, COLUMN_TYPE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, COLUMN_KEY from Information_schema.columns where TABLE_SCHEMA = '${process.db.database}'`,
          mysqlQueryKeys = `select CONSTRAINT_NAME, TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_SCHEMA = '${process.db.database}'`,
          connection  = CreateConnection;


    // Se realiza la query
      connection.query( mysqlQueryColumns, (error, results, fields) => {
        //Si no hubo error, se hace un objeto schema, donde cada nombre de la tabla es una 
        //propiedad del objeto, y cada columna es una propiedad anidada con el tipo de dato que es.

        if (error) {
          reject(error);
          return null;  
        } 
        
        
        const schema = {};

        
        for( let tupla of results ) {
          // Si aun no se ha creado la propiedad, se crea
          if( !(tupla.TABLE_NAME in schema )) {
            schema[tupla.TABLE_NAME] = {};
          }

          if(tupla.COLUMN_NAME != 'borrado') {

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
  
              case 'enum':
                let parsed = tupla.COLUMN_TYPE;
                parsed = parsed.match(/'.+'/)[0];
                parsed = parsed.replace(/'/g, '').split(',');
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].valores=parsed;
              case 'varchar':
              case 'char':
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].tipo = tupla.DATA_TYPE;
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].longitud = tupla.CHARACTER_MAXIMUM_LENGTH;
               break;
            }
          }
         



        }

        //Se guarda la ultima vez que se actualizo el schema
        schema.lastUpdate = Date.now();

        connection.query( mysqlQueryKeys, (error, results, fields) => {
          for( let tupla of results ) {
            
            if (error) {
              reject(error);
              return null;  
            } 

            if( tupla.CONSTRAINT_NAME == 'PRIMARY') {
              schema[tupla.TABLE_NAME].id = tupla.COLUMN_NAME;
            }
            else if (tupla.CONSTRAINT_NAME.substr(0,3) == "FK_"){
              schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].foranea = tupla.REFERENCED_TABLE_NAME;
            }
          }

          //Se guarda el schema en formato JSON
          fs.writeFile( path.join( __dirname, '../../ServerFiles/Schema.json'), JSON.stringify(schema), (err) => {

            if (err) {
              reject(err)
              return null;
            };

          })
          resolve(schema);

        });

      });

    });
  

   

}

export default SchemaQuery;
