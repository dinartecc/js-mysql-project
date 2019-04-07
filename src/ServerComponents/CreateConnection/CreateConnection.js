import { createConnection } from 'mysql';
import { join } from 'path';
import fs from 'fs';

const connection = createConnection( JSON.parse(
                                      fs.readFileSync(join(__dirname, '../../ServerFiles/dbCredentials.json'))
                                      ));

export default connection;
