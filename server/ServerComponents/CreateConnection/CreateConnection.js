import { createConnection } from 'mysql';

const connection = createConnection( JSON.parse(
                                      fs.readFileSync('ServerFiles/dbCredentials.json')
                                      ));

export default connection;
