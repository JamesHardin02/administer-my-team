const express = require('express');
const router = express.Router();
const cTable = require('console.table');
const db = require('../../db/connection');
const { queryAllRoles } = require('../../utils/roleQuery');
const { queryIdEmployees } = require('../../utils/employeeQuery');
const inputCheck = require('../../utils/inputCheck');

// GET all roles 
router.get('/employees', (req, res) => {
  const sql = `SELECT emp.id,
              CONCAT(emp.first_name, " ", emp.last_name) AS name,
              CONCAT(man.first_name, " ", man.last_name) AS manager,
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
    res.json({message: 'success'});
    if(rows[0]){
      console.table(rows);
    } else {
      console.log('No employees found')
    }
  });
});

// POST an employee
router.post('/employee', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'role', 'manager');
  if (errors) {
    console.log({ error: errors });
    return;
  };

  // assign id number of role selected to body.role
  queryAllRoles()
  .then((roleTable) => {
    for(var i=0; i < roleTable.length; i++){
      if(roleTable[i].title === body.role){
        body.role = roleTable[i].id;
      };
    };
    return body
  })
  .then((body) => {
    return queryIdEmployees()})
  .then((employeesTable) => {
    body.manager = body.manager.split(' ')[1];
    for(var i=0; i < employeesTable.length; i++){
      if(employeesTable[i].last_name === body.manager){
        body.manager = employeesTable[i].id;
      };
    };
    return body;
  })
  .then(body => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
    params = [body.first_name, body.last_name, body.role, body.manager];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
      res.json({message: 'success'});
      console.log("Employee successfully added!");
    });
  })
  .catch(err => {
    console.log(err);
  });
});

// UPDATE an employee's role
router.put('/employee', (req, res) => {
  const errors = inputCheck(req.body, 'employee', 'role');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  queryAllRoles()
  .then((roleTable) => {
    for(var i=0; i < roleTable.length; i++){
      if(roleTable[i].title === req.body.role){
        req.body.role = roleTable[i].id;
      };
    };
    return req.body
  })
  .then(body => {
    return queryIdEmployees();
  })
  .then(employeesTable => {
    req.body.employee = req.body.employee.split(' ')[1];
    for(var i=0; i < employeesTable.length; i++){
      if(employeesTable[i].last_name === req.body.employee){
        req.body.employee = employeesTable[i].id;
      };
    };
    return req.body;
  })
  .then((body) => {
    const sql = `UPDATE employee SET role_id = ? 
                WHERE id = ?`;
    const params = [body.role, body.employee];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else {
        res.json({message: 'success'});
        console.log("Successfully updated employee!")
      }
    });
  })
});

module.exports = router;