const db = require('../db/connection');

function queryEmployees(){
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
    CONCAT(emp.first_name, " ", emp.last_name) AS name 
    FROM employee emp;`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      };
      // if employees exist
      if(rows.length > 0){
        //return array of employee names
        resolve(rows.map(nameObj => nameObj.name));
        return;
      } else {
        resolve(['null']);
      }
    });
  });
};

function queryIdEmployees(){
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, last_name FROM employee;`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      };
      // if employees exist
      if(rows.length > 0){
        //return array of department object rows
        resolve(rows);
        return;
      } else {
        resolve(['null']);
      };
    });
  });
};

module.exports = { queryEmployees, queryIdEmployees };