const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const cTable = require('console.table');

// GET all roles 
router.get('/employees', (req, res) => {
  const sql = `SELECT employee.id,
              employee.first_name,
              employee.last_name,
              role.title,
              role.salary,
              department.name
              FROM employee
              LEFT JOIN role
              ON employee.role_id = role.id
              LEFT JOIN department
              ON department.id = role.department_id;
              `;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
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