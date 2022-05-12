const express = require('express');
const router = express.Router();
const cTable = require('console.table');
const db = require('../../db/connection');
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
    res.json({
      message: 'success',
      data: rows,
    });
    console.table(rows);
  });
});

// POST a role
router.post('/role', ({ body }, res) => {
  const errors = inputCheck(body, 'name', 'salary', 'department');
  if (errors) {
    console.log({ error: errors });
    return;
  }


  let existsArr = departmentArr.filter(depo => body.department === depo);
  // const sql = `INSERT INTO role (name, salary, department_id)
  // VALUES (???)`;
  // db.query(sql, body.name, (err, result) => {
  //   if (err) {
  //     console.log({ error: err.message });
  //     return;
  //   }
  //   res.json({
  //     message: 'success',
  //     data: body
  //   });
  //   console.log("Role successfully added");
  // });
});

module.exports = router;