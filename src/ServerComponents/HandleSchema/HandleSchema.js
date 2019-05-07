import SchemaQuery from './SchemaQuery';
import { readFileSync } from 'fs';
import path from 'path';
import fs from 'fs';

const updateTime = 300000;

const HandleSchema = () => {
  return new Promise((resolve, reject) => {

      if (process.hasOwnProperty('schema')) {
        if ( process.schema.lastUpdate + updateTime < Date.now() ) {

          resolve(process.schema);
        }
        else {

          SchemaQuery()
            .then( schema => {

              process.schema = schema;
              resolve(process.schema);
            });

        }
      }

      else {
        try {
          const schemaRaw = readFileSync(path.join( __dirname, '../../ServerFiles/Schema.json'), 'utf8'),
                schema = JSON.parse(schemaRaw); 

          if ( schema.lastUpdate + updateTime < Date.now()) {
            SchemaQuery()
            .then( schema => {
              process.schema = schema;
              resolve(process.schema);
            });
          }
          else {
            process.schema = schema;

            resolve( schema);
          }
        }
        catch(err) {
          SchemaQuery()
            .then( schema => {

              process.schema = schema;
              resolve(process.schema);
            });
        }

      }
  });

};

export default HandleSchema;
