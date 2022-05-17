const inquirer = require('inquirer');
// allows the use of fetch like browser api but in backend
const { fetch } = require('undici');
const { depoNameQuery } = require('../utils/departmentQuery');
const { queryRoleTitles } = require('../utils/roleQuery');
const { queryEmployees } = require('../utils/employeeQuery');

class InterfaceTools{
  optionsPrompt(){
    inquirer.prompt({
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: ["view all departments", 
      "view all roles", 
      "view all employees", 
      "add a department", 
      "add a role",
      "add an employee",
      "update an employee role", 
      "exit application"]
    })
    .then(({ action }) => {
      // "view all" code block
      if (action === "view all departments" || 
      action === "view all roles" || 
      action === "view all employees") {
        // the table's name being viewed
        let table = action.replace('view all ', '');
        this.view(table);
      } // "add a(n)" code block
      else if (action === "add a department" || 
      action === "add a role" || 
      action === "add an employee") {
        let table;
        // the table's name being added to
        if (action === "add an employee"){
          table = action.replace('add an ', '');
        }else{
          table = action.replace('add a ', '');
        };

        if (table === "department"){
          inquirer.prompt({
          type: 'text',
          name: 'name',
          message: `What is the name of the ${table} being added?`,
          validate: name => {
            if (name) {
              return true;
            } else {
              console.log(` You need to enter the ${table}'s name!`);
              return false;
            }}
        })
        .then(departmentData => {
          // fetches the POST route for department table with data
          this.add(table, departmentData);
        });
        } else if (table === "role"){
          // queries DB for department names which returns array
          // of the departments so user can choose depo via list
          depoNameQuery()
            .then(depoData => {
              return depoData;
            })
            .then((depoChoices) => {
            inquirer.prompt([
              {type: 'text',
              name: 'title',
              message: `What is the title of the ${table} being added?`,
              validate: title => {
                if (title) {
                  return true;
                } else {
                  console.log(` You need to enter the ${table}'s title!`);
                  return false;
                }}
              },
              {type: 'text',
              name: 'salary',
              message: `What is the salary of the ${table} being added?`,
              validate: salary => {
                if (salary.includes(',')) {
                  console.log(' The salary cannot include commas!');
                  return false;
                } else if (isNaN(salary)){
                  console.log(' The salary must be a number!');
                  return false;
                } else if (!salary){
                  console.log(' The please enter the salary for the role!');
                  return false;
                } { 
                  return true;
                }}
              },
              {type: 'list',
              name: 'department',
              message: `What is the department of the ${table} being added?`,
              choices: depoChoices
              }
            ])
            .then(roleData => {
              // fetches the POST route for role table with data
              this.add(table, roleData);
            });
          });
        } else if (table === "employee") {
          // querys for role titles and employees returns arrays for
          // list choices for each, so the user can choose which role 
          // the employee will have and which employee is their manager
          queryRoleTitles().
          then((roleData) =>{
            return roleData
          })
          .then((roleTitles)=>{
            queryEmployees()
            .then(employeeNames => {
              if (employeeNames[0] === 'null'){
                inquirer.prompt([
                  {type: 'text',
                  name: 'first_name',
                  message: `What is the first name of the ${table} being added?`,
                  validate: first_name => {
                    if (first_name) {
                      return true;
                    } else {
                      console.log(` You need to enter the ${table}'s first name!`);
                      return false;
                    }}
                  },
                  {type: 'text',
                  name: 'last_name',
                  message: `What is the last name of the ${table} being added?`,
                  validate: last_name => {
                    if (last_name) {
                      return true;
                    } else {
                      console.log(` You need to enter the ${table}'s last name!`);
                      return false;
                    }}
                  },
                  {type: 'list',
                  name: 'role',
                  message: `What role is the ${table} working as?`,
                  choices: roleTitles
                  },
                  {type: 'list',
                  name: 'manager',
                  message: `Which employee is the ${table}'s manager? (select NULL if no manager)`,
                  choices: employeeNames
                  }
                ]).then((employeeData)=>{
                  // fetches the POST route for employee table with data
                  this.add(table, employeeData);
                });
              } else {
                  employeeNames = employeeNames.push('null');
                  inquirer.prompt([
                  {type: 'text',
                  name: 'first_name',
                  message: `What is the first name of the ${table} being added?`,
                  validate: first_name => {
                    if (first_name) {
                      return true;
                    } else {
                      console.log(` You need to enter the ${table}'s first name!`);
                      return false;
                    }}
                  },
                  {type: 'text',
                  name: 'last_name',
                  message: `What is the last name of the ${table} being added?`,
                  validate: last_name => {
                    if (last_name) {
                      return true;
                    } else {
                      console.log(` You need to enter the ${table}'s last name!`);
                      return false;
                    }}
                  },
                  {type: 'list',
                  name: 'role',
                  message: `What role is the ${table} working as?`,
                  choices: roleTitles
                  },
                  {type: 'list',
                  name: 'manager',
                  message: `Which employee is the ${table}'s manager? (select NULL if no manager)`,
                  choices: employeeNames
                  }
                ]).then((employeeData)=>{
                  // fetches the POST route for employee table with data
                  this.add(table, employeeData);
                });
              };
            });
          });
        };
      };
      if (action === "update an employee role") {
        // query returns role by title and employees to so
        // user can choose which employee to update and which role 
        // to re-assign the employee to
        queryRoleTitles()
          .then(roleData => {
            return roleData
          })
          .then(roleTitles=>{
            queryEmployees()
            .then(employeeNames => {
                inquirer.prompt([
                {type: 'list',
                name: 'employee',
                message: `Which employee would you like to update?`,
                choices: employeeNames
                },
                {type: 'list',
                name: 'role',
                message: `Which of the following is the employee's new role?`,
                choices: roleTitles
                }
              ]).then(updateData => {
                // fetches the PUT route for employee table with data
                this.update('employee', updateData);
              });
            });
          });
      };
      if (action === "exit application") {console.log("Thank you! Goodbye.")};
    });
  };

  // GET routes to view console formatted tables 
  view(table){
    fetch(`http://localhost:3001/api/${table}`)
    .then(() => {
      this.optionsPrompt();
    })
    .catch(err => {
      console.log(err)
    });
  };

  // POST routes for add options
  add(table, data){
    fetch(`http://localhost:3001/api/${table}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => {
      this.optionsPrompt();
    })
    .catch(err => {
      console.log(err)
    });
  };

  // PUT route to update employee's role
  update(table, data){
    fetch(`http://localhost:3001/api/${table}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => {
      this.optionsPrompt();
    })
    .catch(err => {
      console.log(err)
    });
  };
};

module.exports = InterfaceTools