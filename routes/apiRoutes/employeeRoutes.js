const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const cTable = require('console.table');

// GET all roles 
router.get('/employees', (req, res) => {
  const sql = `SELECT emp.id,
              emp.first_name,
              emp.last_name,
              man.last_name AS manager,
              role.title,
              role.salary,
              department.name AS department
              FROM employee emp
              LEFT JOIN employee man
              ON emp.manager_id = man.id
              LEFT JOIN role
              ON emp.role_id = role.id
              LEFT JOIN department
              ON department.id = role.department_id;`;
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

module.exports = router;