import CreateConnection from './../CreateConnection/CreateConnection';

/**
 * Funcion para conseguir los movimientos de lotes.
 *
 * 
 * @returns
 */
const GetMovimientos = ( obj  ) => {
  return new Promise( async( resolve, reject ) => {
    try {
      //Crea el objeto para la conexión e importa el schema
      const connection = CreateConnection;
  

      const x = new Date();

      let mysqlQuery = `select sum(cantidad) as cantidad, tipo from movimientos where `
      
      if ( obj.filtroFecha != 'none' ) {
        mysqlQuery += `date_add(fecha, interval 1 ${obj.filtroFecha}) >= '${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}' and `;
      }
      if ( obj.filtroSKU != 'none') {
        mysqlQuery += `SKU = ${obj.filtroSKU} and `;
      }

      mysqlQuery += `borrado = 0 group by tipo order by tipo;`
      console.log(mysqlQuery);

      connection.query( mysqlQuery, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        else {
          const response = {};

          for ( let tupla of results ) {
            if( tupla.tipo == 'Borrado' ) {
              response.eliminados = tupla.cantidad;
            }
            if( tupla.tipo == 'Sacado' ) {
              response.sacados = tupla.cantidad ;
            }
            if( tupla.tipo == 'Ingresado' ) {
              response.ingresados = tupla.cantidad;
            }
          }
          resolve(response);
          
        }
      });

    }
    catch (error) {
      reject(error);
    }
  });
}

export default GetMovimientos;





