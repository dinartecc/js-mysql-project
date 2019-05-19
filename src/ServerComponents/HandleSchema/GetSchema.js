import { join } from 'path';
import fs from 'fs';

const GetSchema = () => JSON.parse(
  fs.readFileSync(join(__dirname, '../../ServerFiles/Schema.json'))
  );



export default GetSchema;
