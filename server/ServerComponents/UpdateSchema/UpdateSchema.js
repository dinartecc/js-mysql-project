import path from 'path';
import fs from 'fs';
import SchemaQuery from './SchemaQuery';

const UpdateSchema = () => {
  fs.readFile( path.join( __dirname, '../../ServerFiles/Schema.json' ), 'utf8', ( err, data ) => {
    if ( err ) {
      SchemaQuery();
      return null;
    }

    

    
  });
};

export default UpdateSchema;
