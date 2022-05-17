const express = require('express');
const router = express.Router();
const cTable = require('console.table');
const db = require('../../db/connection');
const { depoAllQuery } = require('../../utils/departmentQuery');
const inputCheck = require('../../utils/inputCheck');

// GET all roles 
router.get('/roles', (req, res) => {
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
    res.json({message: 'success'});
    console.table(rows);
  });
});

// POST a role
router.post('/role', ({ body }, res) => {
  const errors = inputCheck(body, 'title', 'salary', 'department');
  if (errors) {
    console.log({ error: errors });
    return;
  }

  // assign id number of department selected to body.department
  depoAllQuery()
  .then((departmentTable) => {
    for(var i=0; i < departmentTable.length; i++){
      if(departmentTable[i].name === body.department){
        body.department = departmentTable[i].id;
      };
    };
    return body;
  })
  .then(body => {
    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
    params = [body.title, body.salary, body.department];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
      res.json({message: 'success'});
      console.log("Role successfully added!");
    });
  })
});

module.exports = router;