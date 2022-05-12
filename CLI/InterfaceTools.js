const inquirer = require('inquirer');
const { fetch, Client } = require('undici')
const client = new Client(`http://localhost:3001`)

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
      "and update an employee role", 
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
        // the table's name being added to
        let table = action.replace('add a ', '');
        inquirer.prompt({
          type: 'text',
          name: 'name',
          message: `What is the name of the ${table} being added?`,
          validate: name => {
            if (name) {
              return true;
            } else {
              console.log(`You need to enter the ${table}'s name!`);
              return false;
            }
          }
        })
        .then(departmentData => {
          this.add(table, departmentData);
        });
      };
      if (action === "and update an employee role") {};
      if (action === "exit application") {console.log("Thank you! Goodbye.")};
    })
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

  //POST routes for add options
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
};

module.exports = InterfaceTools