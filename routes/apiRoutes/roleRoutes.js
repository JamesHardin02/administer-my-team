const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const cTable = require('console.table');

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

module.exports = router;