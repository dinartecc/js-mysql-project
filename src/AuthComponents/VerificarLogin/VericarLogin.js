import mysql from 'mysql';
import CreateConnection from '../../ServerComponents/CreateConnection/CreateConnection';

const VerificarLogin = ( usuario, contra ) => {
  return new Promise( (resolve, reject) => {
    const connection = CreateConnection;
    const query = `select roles.ID_rol,nombre,user,name, pass,
    (case productos
          when 'Ninguno' then 1
          when 'Leer' then 2
          when 'Escribir' then 3
          when 'Actualizar' then 4
          when 'Eliminar' then 5
          end) as productos,
    (case clasificacion
          when 'Ninguno' then 1
          when 'Leer' then 2
          when 'Escribir' then 3
          when 'Actualizar' then 4
          when 'Eliminar' then 5
          end) as clasificacion,
    (case lotes
          when 'Ninguno' then 1
          when 'Leer' then 2
          when 'Escribir' then 3
          when 'Actualizar' then 4
          when 'Eliminar' then 5
          end) as lotes,
    (case reportes
          when 'Ninguno' then 1
          when 'Leer' then 2
          when 'Escribir' then 3
          when 'Actualizar' then 4
          when 'Eliminar' then 5
          end) as reportes,
    (case administrador
          when 'No' then 1
          when 'Si' then 2
          end) as administrador 
      from usuarios join roles on usuarios.ID_rol = roles.ID_rol  where upper(user) regexp ${mysql.escape(usuario)} and pass regexp ${mysql.escape(contra)}`;
  
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
