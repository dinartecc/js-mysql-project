import CreateConnection from './../CreateConnection/CreateConnection';
import mysql from 'mysql';
import HandleSchema from '../HandleSchema/HandleSchema';
/**
 * La función para hacer una query.
 *
 * @param Object Se manda el object con los parametros pagina, columnas, tabla, orden, condiciones, y desc. Tabla es el unico requerido.
 * @returns
 */
const QueryDatabase = ( obj ) => {
  return new Promise( async( resolve, reject ) => {

    let forCheck = false,
        forNombres = [];

    //Valores predeterminados
    if ( !obj.hasOwnProperty('orden') ) {
      obj.orden = 'id';
    }
    if ( !obj.hasOwnProperty('pagina')) {
      obj.pagina = 1;
    }
    if ( !obj.hasOwnProperty('limite')) {
      obj.limite = 10
    }

    

    if (obj.hasOwnProperty('foranea')) {
      forCheck = true;
      for( let nombre in obj.foranea ) {
        forNombres.push(nombre);
      }
    }

    // Si se intenta modificar el registro 0, da un error
    if(obj.id == 0) {
      throw new Error('905: No pueden editar el registro con ID 0');
    }

    //Crea el objeto para la conexión e importa el schema
    const connection = CreateConnection,
          schema = await HandleSchema()
             .then( sch =>  sch )
             .catch( err => {throw err});

      //Revisa si existe la tabla
    if ( !schema.hasOwnProperty(obj.tabla) )
    {
      throw new Error('902: Esa tabla no existe en el schema');
    }

    //Asigna el nombre de la tabla al objeto
    obj.idname = schema[obj.tabla].id; 

    // Inicializa la query con el update
    let mysqlQuery = `select `;

    // Si no se envian atributos, por defecto buscara todo
    if ( !obj.hasOwnProperty('columnas') ) {
      mysqlQuery += `* from ${obj.tabla} `;
    }
    // De lo contrario, itera sobre todos los atributos
    else {
      let columnaQuery = '';
      for( let columna of obj.columnas ) {
        //Si es id, se pone automaticamente el nombre del id
        if ( columna != 'id'  ) {
          
          if ( forNombres.includes(columna) ){

            for( let columnaSub of obj.foranea[columna].columnas) {

              columnaQuery += `${obj.foranea[columna].tabla}.${columnaSub} as '${obj.foranea[columna].tabla}_${columnaSub}' , `;
            }
          }
          else {
            columnaQuery += `${ forCheck ? `${obj.tabla}.` : '' }${columna} , `;
          }
        }
        else {
          columnaQuery += `${ forCheck ? `${obj.tabla}.` : '' }${ obj.idname } , `;
        }
      }

      //Error si no hubo ningun campo
      if( columnaQuery == '' ) {
        throw new Error('905: Mandaron un array vacio para los atributos');
      }

      columnaQuery = columnaQuery.substr (0, columnaQuery.length-2);

      mysqlQuery += `${columnaQuery} from ${obj.tabla} `;

      if( forCheck ) {
        for( let columna of forNombres ){
          mysqlQuery += `join ${obj.foranea[columna].tabla} on ${obj.tabla}.${columna} = ${obj.foranea[columna].tabla}.${columna} `;
        }
      }
      
      

    }


    //Las condiciones where. Si no se enviaron, solo se pone que no muestre el 0
    if ( !obj.hasOwnProperty( 'condiciones' ) ) {
      mysqlQuery += `where ${obj.idname} != 0 `;
    }
    else {
      
      //Inicializa condicion
      let condicionQuery = '';

      //Itera sobre todos los atributos de condiciones
      for( const condicion in obj.condiciones ) {
        if ( obj.condiciones[condicion] != '' ){
          if ( condicion != 'id' ) {
            condicionQuery += `upper(${obj.tabla}.${condicion}) regexp ${mysql.escape(obj.condiciones[condicion])} and `;
          }
          else {
            condicionQuery += `${obj.tabla}.${obj.idname} = ${mysql.escape(obj.condiciones[condicion])} and `;
          }
        }
      }

      

      //Si se mando un objeto condicion vacio, se retorna un error

      //Se quita el ultimo and y se pone esta seccion a la query
      mysqlQuery += `where ${condicionQuery} ${obj.idname} != 0 `;
    

    }

    // Orden
    mysqlQuery += `order by ${ ( obj.orden == 'id' )? `${obj.tabla}.${obj.idname}` : `${obj.tabla}.${obj.orden}` } ${ obj.desc ? 'desc ' : '' } `;
    
    // Pagina
    mysqlQuery += `limit ${ obj.limite } ${ obj.pagina == 1 ? '' : `offset ${ (obj.pagina - 1) * limitePagina  }` };`;

    // Realiza la query
    connection.query( mysqlQuery, (error, results, fields) => {
      if (error) {
        throw error;
      }
      resolve(results);
    });

  });
}

export default QueryDatabase;
