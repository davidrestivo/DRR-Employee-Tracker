
const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");

// Optional: import asciiart-logo
const logo = require('asciiart-logo');
// import your database module
const config = require('./package.json');

const { menu, department, role, employee, update } = require("./inputs");

const db = mysql.createConnection({
  host: "127.0.0.1",
  // Your username
  user: "root",
  database: "employee_db"
}, console.log(`retrieved employee_db.`));

// Add a department
function addDepartment() {
  inquirer.prompt(department)
      .then((data) => {
          db.query(`INSERT INTO department SET ?`, data, (err, results) => {
              console.log(`${data.name} added to depts.`);
              init();
          });
      });
}

// functon - Add a role
function addRole() {
  inquirer.prompt(role).then((data) => {
      db.query(`INSERT INTO roles ?`, data, (err, results) => {
          console.log(`${data.title} added to roles`);
          init();
      });
  });
}

// function - Add a new employee
function addEmployee() {
  inquirer.prompt(employee).then((data) => {
      db.query(`INSERT INTO employees ?`, data, (err, results) => {
          console.log(`${data.first_name} ${data.last_name} added too employee list`);
          init();
      });
  });
}

// function - Update an employee's role
function updateEmployee() {
  inquirer.prompt(update).then((data) => {
      db.query(
          `UPDATE employee SET role = "${data.updateRole}" WHERE employee_id = ${data.updateID};`, (err, results) => {
              console.log(`employee info up to date`);
              init();
          });
  });
}

function init() {
  inquirer
      .prompt(menu)
      .then(({ initQuestion }) => {
          if (initQuestion == "show departments") {
              db.query("SELECT * FROM department", (err, results) => {
                  console.table(results);
                  init();
              });
          } else if (initQuestion == "show roles") {
              db.query("SELECT * FROM role", (err, results) => {
                  console.table(results);
                  init();
              });
          } else if (initQuestion == "show employees") {
              db.query("SELECT * FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id", (err, results) => {
                  console.table(results);
                  init();
              });
          } else if (initQuestion == "add department") {
              db.query("SELECT * FROM department", (err, results) => {
                  console.table(results);
                  addDepartment();
              });
          } else if (initQuestion == "add role") {
              db.query("SELECT * FROM role", (err, results) => {
                  console.table(results);
                  addRole();
              });
          } else if (initQuestion == "add employee") {
              db.query("SELECT * FROM employee", (err, results) => {
                  console.table(results);
                  addEmployee();
              });
          } else if (initQuestion == "change employee role") {
              db.query("SELECT * FROM employee", (err, results) => {
                  console.table(results);
                  updateEmployee();
              });
          } else {
              return
          }
      });
}

function art() {
  console.log(
    logo({
      name: "My Company DataBase",
      font: 'Soft',
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: 'grey',
      logoColor: 'grey',
      textColor: 'grey',
    })
    .emptyLine()
    .right('version 1.0.0')
    .render()
  );
}
art();
init();


