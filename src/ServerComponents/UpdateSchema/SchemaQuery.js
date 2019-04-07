import CreateConnection from '../CreateConnection/CreateConnection';
import fs  from 'fs';
import path from 'path';


const SchemaQuery = () => {
  return new Promise(( resolve, reject ) => {

    const mysqlQuery = `select TABLE_NAME, COLUMN_NAME, DATA_TYPE from Information_schema.columns where TABLE_SCHEMA = 'heroku_8e679e6d32fb43a'`;

    const connection  = CreateConnection;

    connection.connect();

    connection.query( mysqlQuery, (error, results, fields) => {

      connection.end();

      if (error) reject(new Error(error));

      const schema = {};

      for( let tupla of results ) {
        if( !(tupla.TABLE_NAME in schema )) {
          schema[tupla.TABLE_NAME] = {};
        }
        schema[tupla.TABLE_NAME][tupla.COLUMN_NAME] = tupla.DATA_TYPE;
      }
      
      fs.writeFile( path.join( __dirname, '../../ServerFiles/Schema.json'), JSON.stringify(schema), (err) => {
        console.log(err);
        if (error) reject(new Error(err));
        else console.log ('yay');
      })

      
    });

  })
}

export default SchemaQuery;
