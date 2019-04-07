import path from 'path';
import fs from 'fs';

const UpdateSchema = () => {
  fs.readFile( path.join( __dirname, 'ServerFiles/Schema.json' ), 'utf8', ( err, data ) => {
    if ( err ) {
      console.log ('owo');
    }
  });
};

export default UpdateSchema;
