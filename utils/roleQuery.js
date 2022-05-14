const db = require('../db/connection');

function queryAllRoles(){
  return new Promise((resolve, reject) => {
    const sql = `SELECT role.id,
    role.title,
    role.salary,
    department.name 
    AS department 
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      };
      if(rows.length > 0){
        resolve(rows);
        return;
      }else{
        reject({message: 'No roles found!'});
      }
    });
  });
};


function queryRoleTitles(){
  return new Promise((resolve, reject) => {
    const sql = `SELECT role.title FROM role;`
    console.log('query')
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      };
      if(rows.length > 0){
        resolve(rows.map(titleObj => titleObj.title));
        return;
      }else{
        reject({message: 'No roles found!'});
      }
    });
  })
}

module.exports = { queryAllRoles, queryRoleTitles };