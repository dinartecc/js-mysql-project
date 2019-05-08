import mysql from 'mysql';
import CreateConnection from '../../ServerComponents/CreateConnection/CreateConnection';

const VerificarLogin = ( usuario, contra ) => {
  return new Promise( (resolve, reject) => {
    
    const connection = CreateConnection;
    const query = `select * from usuarios where upper(user) regexp ${mysql.escape(usuario)} and upper(pass) regexp ${mysql.escape(contra)} `;


    connection.query(query, (error, results, fields) => {
      if (error) throw error;

      if (results.length == 1 ) {
        resolve();
      }
      else {
        reject();
      }
    });
  })

}

export default VerificarLogin;
