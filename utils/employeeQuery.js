const db = require('../db/connection');

function queryEmployees(){
  return new Promise((resolve, reject) => {
    const sql = `SELECT employee.last_name FROM employee `;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      };
      if(rows.length > 0){
        resolve(rows.map(nameObj => nameObj.last_name));
        return;
      }else{
        reject({message: 'No roles found!'});
      }
    });
  });
};

module.exports = { queryEmployees };