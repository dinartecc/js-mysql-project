import { join } from 'path';
import fs from 'fs';

const GetSchema = () => {
  if (process.hasOwnProperty('schema')){
    return process.schema;
  }
  else {
    const readSchema = JSON.parse(
      fs.readFileSync(join(__dirname, '../../ServerFiles/Schema.json'))
      );
    process.schema = readSchema;
    return process.schema;
  }
  
};



export default GetSchema;
