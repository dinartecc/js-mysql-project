import { readFileSync }  from 'fs';
import {join} from 'path';

const ValidateFecha = ( val ) => {
  
 
  const regExp = new RegExp(`^\\d{4}-\\d{2}-\\d{2}$`);
  
   if ( !val.match(regExp) ){
    return `no es una fecha valida`;

  }

  return '';

};

const ValidateVarChar = ( val, length ) => {
  
 
  const regExp = new RegExp(`^.{1,${length}}$`);
  
   if ( !val.match(regExp) ){
    return `debe de tener una longitud de entre 1 y ${length}`;

  }

  return '';

};

const ValidateChar = ( val, length ) => {
  
 
  const regExp = new RegExp(`^.{${length}}$`);
  
   if ( !val.match(regExp) ){
    return `debe de tener una longitud de ${length}`;

  }

  return '';

};

const ValidateMoneda = ( val, length ) => {
  

  if( isNaN(val) ) {
    return 'no es un número!';
  }
  if ( val < 0 ) {
    return 'no puede ser negativo!';
  }
  
  const string = val.toString(),
        regExp = new RegExp(`^\\d{1,${length-2}}(\\.\\d{1,2})?$`);
  
  
   if ( !string.match(regExp) ){
    return `no es un monto valido`;

  }
  return '';
};

const ValidateInt = ( val, length ) => {
  

  if( isNaN(val) ) {
    return 'no es un número!';
  }
  if ( val < 0 ) {
    return 'no puede ser negativo!';
  }
  
  const string = val.toString(),
        regExp = new RegExp(`^\\d{1,${length}}$`);
  
  
   if ( !string.match(regExp) ){
    return `debe de tener una longitud de 1 y ${length}`;

  }

  return '';

};

const ValidateInput = (obj) => {

  const error = [];

  const schema = JSON.parse(
    readFileSync(join(__dirname, '../../ServerFiles/Schema.json'))
    );

  if(!schema.hasOwnProperty(obj.tabla)) {

    error.push('Esta tabla no existe en el schema!');
    return error;

  }

  obj.idname = schema[obj.tabla].id;
  let respuesta = '',
      valor;

  for ( let prop in obj ){
    valor = obj[prop];
    if ( prop != 'tabla' && prop != 'id' ) {
      if (prop == 'idname'){
        prop = obj[prop];
        valor = obj.id;
      }
      if(!schema[obj.tabla].hasOwnProperty(prop)) {
        error.push(`La propiedad ${prop} no existe en el schema`);
      }
      else {
        switch(schema[obj.tabla][prop].tipo) {
          case 'int':
            respuesta = ValidateInt( valor, schema[obj.tabla][prop].longitud );
            break;
          case 'moneda':
            respuesta = ValidateMoneda( valor, schema[obj.tabla][prop].longitud );
            break;
          case 'fecha':
            respuesta = ValidateFecha( valor, schema[obj.tabla][prop].longitud );
            break;
          case 'char':
            respuesta = ValidateChar( valor, schema[obj.tabla][prop].longitud );
            break;
          case 'varchar':
            respuesta = ValidateVarChar( valor, schema[obj.tabla][prop].longitud );
            break;
          }
        respuesta == '' ? null : error.push(`${prop} ${respuesta}`);
        }
      }
    };

    return error;

  


}

export default ValidateInput;
