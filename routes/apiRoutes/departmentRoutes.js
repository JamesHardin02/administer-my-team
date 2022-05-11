const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const cTable = require('console.table');

// GET all parties 
router.get('/departments', (req, res) => {
  const sql = `SELECT * FROM department`;
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