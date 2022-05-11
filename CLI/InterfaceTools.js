const inquirer = require('inquirer');
const { fetch, Request, Response } = require('undici')

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
      if (action === 'view all departments') {
        // GET function for all view options
        this.view('departments')
      };
      if (action === "view all roles") {};
      if (action === "view all employees") {};
      if (action === "add a department") {};
      if (action === "add a role") {};
      if (action === "add an employee") {};
      if (action === "and update an employee role") {};
      if (action === "exit application") {};
    })
  };

  view(table){
    await fetch(`/api/${table}`)
    .then(response => {
      console.log(`${table} fecthed!`)
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  };
};

module.exports = InterfaceTools
// control structure for options
// view all departments fetch(GET) request