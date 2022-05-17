const express = require('express');
const router = express.Router();
const cTable = require('console.table');
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET all departments 
router.get('/departments', (req, res) => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log({ error: err.message });
      return;
    };
    res.json({message: 'success'});
    if(rows[0]){
      console.table(rows);
    } else {
      console.log('No departments found')
    }
  });
});

// POST a department
router.post('/department', ({ body }, res) => {
  const errors = inputCheck(body, 'name');
  if (errors) {
    console.log({ error: errors });
    return;
  }

  const sql = `INSERT INTO department (name)
  VALUES (?)`;
  db.query(sql, body.name, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    res.json({message: 'success'});
    console.log("Department successfully added");
  });
});

module.exports = router;