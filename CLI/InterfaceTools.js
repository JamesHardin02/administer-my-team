const inquirer = require('inquirer');
const { fetch } = require('undici')

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
      if (action === 'view all departments' || 
      action === "view all roles" || 
      action === "view all employees") {
        let table = action.replace('view all ', '');
        this.view(table);
      };
      if (action === "add a department") {};
      if (action === "add a role") {};
      if (action === "add an employee") {};
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
    })
  };
};

module.exports = InterfaceTools