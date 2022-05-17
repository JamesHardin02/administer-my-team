const db = require('../db/connection');

function depoNameQuery(){
  return new Promise((resolve, reject) => {
    const sql = `SELECT department.name FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      };
      // if departments exist
      if(rows.length > 0){
        //return array of department names
        resolve(rows.map(nameObj => nameObj.name));
        return;
      }else{
        reject({message: 'No departments found!'});
      }
    });
  });
};

function depoAllQuery(){
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      };
      //if departments exist
      if(rows.length > 0){
        //return array of department object rows
        resolve(rows);
        return;
      }else{
        reject({message: 'No departments found!'});
      }
    });
  });
};

module.exports = { depoNameQuery, depoAllQuery }