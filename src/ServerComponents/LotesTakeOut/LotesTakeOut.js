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
        
      },
      fecha = new Date();
      

      let mysqlQuery = '',
          mysqlMovimiento = 'insert into movimientos (user, ID_lotes, SKU, tipo, fecha, cantidad ) values ',
          acumulador = obj.cantidad,
          lotesSacados = [],
          cantidadLotes = [],
          sacadosLotes = [];

      const results = await QueryDatabase(query);


      for( let lote of results.body ) {
        if(lote.cantidad != 0) {
          lotesSacados.push(lote.ID_lotes);
          if ( lote.cantidad > acumulador ) {

            const nuevaCantidad = lote.cantidad - acumulador;
            sacadosLotes.push(acumulador);
            
            cantidadLotes.push(nuevaCantidad);

            mysqlMovimiento += `('${obj.user}', ${lote.ID_lotes}, '${obj.sku}', 2, '${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}', ${acumulador}), `

            acumulador = 0;
            mysqlQuery += `update lotes set cantidad = ${nuevaCantidad}${nuevaCantidad == 0 ? ', marcarSalida = 1' : '' } where ID_lotes = ${lote.ID_lotes};\n`;
            break;
          }
          else {
            acumulador = acumulador - lote.cantidad;
            sacadosLotes.push(lote.cantidad);
            cantidadLotes.push(0);
            mysqlQuery += `update lotes set cantidad = 0, marcarSalida = 1 where ID_lotes = ${lote.ID_lotes};\n`;
            mysqlMovimiento += `('${obj.user}', ${lote.ID_lotes}, '${obj.sku}', 2, '${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}', ${lote.cantidad}), `
            if (acumulador == 0) {
              break;
            }
          }
        }
        
      }
      mysqlMovimiento = mysqlMovimiento.substr(0, mysqlMovimiento.length -2 )+';';
      mysqlQuery = mysqlQuery + mysqlMovimiento;

      console.log(mysqlMovimiento);

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
             cantidad : cantidadLotes,
             sacados: sacadosLotes
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
