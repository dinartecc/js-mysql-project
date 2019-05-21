import mysql from 'mysql';
import CreateConnection from '../../ServerComponents/CreateConnection/CreateConnection';

const VerificarLogin = ( usuario, contra ) => {
  return new Promise( (resolve, reject) => {
    
    const connection = CreateConnection;
    const query = `select user,name, productos, clasificacion,lotes, usuarios, admin, rol from usuarios join roles on usuarios.ID_rol = roles.ID_rol  where upper(user) regexp ${mysql.escape(usuario)} and upper(pass) regexp ${mysql.escape(contra)}`;

  
    connection.query(query, (error, results, fields) => {
      
      if (error) {
        reject(error);
      }

      else if (results.length == 1 ) {
        resolve(results);
      }
      else {
        reject('No se encontro el usuario');
      }
    });
  })

}

export default VerificarLogin;
