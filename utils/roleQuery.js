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
      // if roles exist
      if(rows.length > 0){
        // return array of role obj rows
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
    db.query(sql, (err, rows) => {
      if (err) {
        console.log({ error: err.message });
        return;
      };
      // if roles exist
      if(rows.length > 0){
        // return array of role titles
        resolve(rows.map(titleObj => titleObj.title));
        return;
      }else{
        reject({message: 'No roles found!'});
      }
    });
  })
}

module.exports = { queryAllRoles, queryRoleTitles };