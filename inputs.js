const inputs = {
    menu: [
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "show departments",
          "show roles",
          "show employees",
          "add department",
          "add role",
          "add employee",
          "change employee role",
          "quit",
        ],
        name: "initQuestion",
      },
    ],
    department: [
      {
        type: "input",
        message: "Enter department name.",
        name: "name",
      },
    ],
    role: [
      {
        type: "input",
        message: "Enter job position/role.",
        name: "title",
      },
      {
        type: "input",
        message: "Enter salary.",
        name: "salary",
      },
      {
        type: "input",
        message: "Enter the department ID for the role.",
        name: "department_id",
      },
    ],
    employee: [
      {
        type: "input",
        message: "Enter first name",
        name: "first_name",
      },
      {
        type: "input",
        message: "Enter last name",
        name: "last_name",
      },
      {
        type: "input",
        message: "Enter role.",
        name: "role_id",
      },
      {
        type: "input",
        message: "Enter employees' manager's ID.",
        name: "manager_id",
      },
    ],
    update: [
      {
        type: "input",
        message: "Enter the ID of the employee.",
        name: "updateID",
      },
      {
        type: "input",
        message: "Enter the new role ID for this employee.",
        name: "updateRole",
      },
    ],
  };
  
  module.exports = inputs;