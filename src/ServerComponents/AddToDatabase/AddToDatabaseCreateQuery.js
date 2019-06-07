import mysql from 'mysql';

/**
 * La función genérica para crear la query para añadir un objeto a la base de datos.
 *
 * @param Object Cada propiedad del objeto representa un conjunto columna/valor. La propiedad tabla esta reservada para el nombre de la tabla
 * @returns
 */
const AddToDatabaseCreateQuery = ( obj ) => {
  return new Promise(( resolve, reject ) => {

    let mysqlQuery = 'INSERT INTO ',
        queryCol = '',
        queryVal = '';

    // Si no se mando el nombre de la tabla, se retorna falso
    if( obj.tabla == null || obj.tabla == false ) {
      throw new Error('900: Ninguna tabla seleccionada');

    }

    // Inicializa la query
    mysqlQuery = mysqlQuery + mysql.escapeId(obj.tabla) + ' ';

    // Itera sobre cada propiedad del objeto, utilizando el nombre para las columnas y el valor para el mismo valor en las queries.
    for( const columna in obj ) {
      if ( columna != 'tabla' && columna != 'id' && columna != 'usernameMov') {
        queryCol += columna + ', ' ;
        queryVal += mysql.escape(obj[columna]) + ', ';
      }
    }

    // Si estan vacios los acumuladores, envia error
    if( queryCol == '' || queryVal == ''  ) {
      throw new Error('901: No se mandaron valores a insertar');
    }


    // Quita la coma extra
    queryCol = queryCol.substr( 0, queryCol.length-2 );
    queryVal = queryVal.substr( 0, queryVal.length-2 );

    // La query final. Hace una subquery para el auto_increment
    if ( obj.hasOwnProperty('id') ) {
      mysqlQuery = `${mysqlQuery} ( ${ obj.id }, ${queryCol}) VALUES ( (select ${obj.id} from (select * from ${obj.tabla}) as x order by ${obj.id} desc limit 1) + 1, ${queryVal})`;
    }
    else {
      mysqlQuery = `${mysqlQuery} ( ${queryCol}) VALUES ( ${queryVal})`;
    }
    

    resolve(mysqlQuery);

  }); 

};

export default AddToDatabaseCreateQuery;
