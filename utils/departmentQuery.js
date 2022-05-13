const db = require('../db/connection');

function depoNameQuery(){
  return new Promise((resolve, reject) => {
    const sql = `SELECT department.name FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      };
      if(rows.length > 0){
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
      if(rows.length > 0){
        resolve(rows);
        return;
      }else{
        reject({message: 'No departments found!'});
      }
    });
  });
};

module.exports = { depoNameQuery, depoAllQuery }