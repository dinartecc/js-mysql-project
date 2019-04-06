import mysql from 'mysql';

const AddToDatabase = ( mes ) => {
  return new Promise(( resolve, reject ) => {

    let mysqlQuery = 'INSERT INTO ',
        queryCol = '',
        queryVal = '';

    if( mes.tabla == null || mes.tabla == false ) {
      reject( new Error('202: No tabla seleccionada'));
    }

    mysqlQuery = mysqlQuery + mes.tabla + ' ';

    for( const columna in res ) {
      if ( columna != 'tabla' ) {
        if ( queryCol.length != 0 ) {
          queryCol += ', ';
          queryVal += ', ';
        }

        queryCol += columna;
        queryCol

      }
    }

  }); 

};
