import CreateConnection from './../CreateConnection/CreateConnection';
import HandleSchema from '../HandleSchema/HandleSchema';

/**
 * Funcion para conseguir las alertas de los lotes.
 *
 * 
 * @returns
 */
const GetAlerts = (  ) => {
  return new Promise( async( resolve, reject ) => {
    try {
      //Crea el objeto para la conexión e importa el schema
      const connection = CreateConnection;
      let mysqlQuery = `select producto.nombre, producto.minimo_stock, cantidad, producto.sku as producto, lotes.sku as lotes from producto join (select id_lotes, sum(cantidad) as cantidad, sku, borrado from lotes group by sku) as lotes on producto.sku = lotes.sku where producto.borrado = false and lotes.borrado = false and lotes.cantidad <= producto.minimo_stock and lotes.id_lotes != 0 and producto.vigilar = true;`;

      const x = new Date();

      
      mysqlQuery += `select id_lotes, dias_antes_vencimiento, fecha_caducidad, producto.sku as producto, lotes.sku as lotes , producto.nombre as nombre from producto join (select id_lotes, fecha_caducidad, sku, borrado from lotes) as lotes on producto.sku = lotes.sku where producto.borrado = false and lotes.borrado = false and date_sub(fecha_caducidad,interval dias_antes_vencimiento day) <= '${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}' and producto.perecedero = 1;`;

      connection.query( mysqlQuery, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        else {
          for( let tupla in results[1] ) {
            const fecha = results[1][tupla].fecha_caducidad;
            results[1][tupla].fecha_caducidad = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
          }
          resolve(results);
          
        }
      });

    }
    catch (error) {
      reject(error);
    }
  });
}

export default GetAlerts;





