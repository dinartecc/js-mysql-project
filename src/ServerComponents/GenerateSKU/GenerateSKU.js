import CreateConnection from './../CreateConnection/CreateConnection';


/**
 * Generar un nuevo SKU.
 *
 * @param {Number} subcategoria  La subcategoria del producto.
 * @param {Number} marca  La marca del producto
 * @returns {String}
 */
const GenerateSKU = ( obj ) => {
  return new Promise( async( resolve, reject ) => {
    try {

      //Crea el objeto para la conexión e importa el schema
      const connection = CreateConnection,
            subcategoria = obj.ID_subcategoria,
            marca = obj.ID_marca,
            mysqlQuery = `select sku from producto where (ID_subcategoria = ${subcategoria} or ID_subcategoria = 0) and (ID_marca = ${marca} or ID_marca = 0) order by sku desc;`;

      //Realiza la query. Si no hay error, resuelve con los resultados
      connection.query( mysqlQuery, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        else {

          let sku = results[0].sku,
              variante = parseInt(sku.substring(6)) + 1,
              varianteString = variante.toString(),
              subcategoriaString = subcategoria.toString(),
              marcaString = marca.toString(),
              longitud = varianteString.length;

              // Hace que la variante nueva tenga 5 digitos
              for(;longitud < 5; longitud++) {
                varianteString = '0' + varianteString;
              }

              longitud = subcategoriaString.length;   
              
              //Hace que la subcategoria tenga 3 digitos
              for(;longitud < 3; longitud++) {
                subcategoriaString = '0' + subcategoriaString;
              }

              longitud = marcaString.length;   
              
              // Hace que la marca tenga 3 digitos
              for(;longitud < 3; longitud++) {
                marcaString = '0' + marcaString;
              }

              const newSKU = `${subcategoriaString}${marcaString}${varianteString}`

              //retorna el resultado
              resolve(newSKU);
        }
      });
    }
    catch (error) {
      reject(error);
    }
  });
}

export default GenerateSKU;
