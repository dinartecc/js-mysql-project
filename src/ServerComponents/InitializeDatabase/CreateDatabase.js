import mysql from 'mysql';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';

const CreateDatabase = () => {
  return new Promise( (resolve, reject) => {
    const connectobj = JSON.parse(readFileSync(join(__dirname, '../../ServerFiles/dbCredentials.json'))),
      query = `create database if not exists ${ connectobj.database };`

    delete connectobj.database;


    const connection = mysql.createPool(connectobj);

    connection.query(query, (error, results, fields) => {
      if (error) throw error;

      resolve(results);

    });

  }); 
}

export default CreateDatabase;
