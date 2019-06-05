import CreateConnection from './../CreateConnection/CreateConnection';
import HandleSchema from '../HandleSchema/HandleSchema';
import QueryDatabase from '../QueryDatabase/QueryDatabase';
import connection from './../CreateConnection/CreateConnection';

/**
 * Funcion para retirar producto unitario de los lotes.
 *
 * 
 * @returns
 */
const LotesTakeOut = ( obj ) => {
  return new Promise( async( resolve, reject ) => {
    try {

      const query = {
        tabla: 'lotes',
        columnas: ['cantidad','ID_lotes'],
        condiciones: {
          sku: obj.sku
        },
        orden: 'fecha_caducidad',
        limite: 400,
        
      }

      let mysqlQuery = '',
          acumulador = obj.cantidad,
          lotesSacados = [],
          cantidadLotes = [];

      const results = await QueryDatabase(query);



      for( let lote of results.body ) {
        if(lote.cantidad != 0) {
          lotesSacados.push(lote.ID_lotes);
          if ( lote.cantidad > acumulador ) {

            const nuevaCantidad = lote.cantidad - acumulador;
            acumulador = 0;
            cantidadLotes.push(nuevaCantidad);
            
            mysqlQuery += `update lotes set cantidad = ${nuevaCantidad}${nuevaCantidad == 0 ? ', marcarSalida = 1' : '' } where ID_lotes = ${lote.ID_lotes};\n`;
            break;
          }
          else {
            acumulador = acumulador - lote.cantidad;
            
            cantidadLotes.push(lote.cantidad);
            mysqlQuery += `update lotes set cantidad = 0, marcarSalida = 1 where ID_lotes = ${lote.ID_lotes};\n`;
            if (acumulador == 0) {
              break;
            }
          }
        }
        
      }



      if(acumulador != 0) {
        reject();
      }
      else {
        connection.query(mysqlQuery, (error, results, fields) => {
          if (error) {
            reject(error);
          }
          else {
           const response = {
             ids : lotesSacados,
             cantidad : cantidadLotes
           } 

           resolve(response);
           
          }
        });
      }

      
        
      

      


    }
    catch (error) {
      reject(error);
    }
  });
}

export default LotesTakeOut;
