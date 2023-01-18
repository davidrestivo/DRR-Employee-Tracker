
const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");

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
                if (err) {
                    throw err
                }
                console.log(`${data.name} added to depts.`);
                init();
            });
        });
}

// functon - Add a role
function addRole() {
    db.query("SELECT * FROM department", (err, results) => {
        if (err) {
            throw err
        }
        let deparmentChoices = results.map(deparment => {
            return {
                name: deparment.name,
                value: deparment.id
            }
        })
        role.push({
            type: "list",
            message: "the deparment that this role belongs to: ",
            name: "department_id",
            choices: deparmentChoices
        })

        inquirer.prompt(
            role
        ).then((data) => {
              db.query(`INSERT INTO role SET ?`, data, (err, results) => {
                if(err){
                    throw err
                }

                console.log(`${data.title} added to roles`);
                  init();
              });

        });
    });

}

// function - Add a new employee
function addEmployee() {
    inquirer.prompt(employee).then((data) => {
        db.query(`INSERT INTO employee SET ?`, data, (err, results) => {
            if (err) {
                throw err
            }
            console.log(`${data.first_name} ${data.last_name} added too employee list`);
            init();
        });
    });
}

// function - Update an employee's role
function updateEmployee() {
    inquirer.prompt(update).then((data) => {
        db.query(
            `UPDATE employee SET role_id = ${data.updateRole} WHERE id = ${data.updateID};`, (err, results) => {
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
                    if (err) {
                        throw err
                    }
                    console.table(results);
                    updateEmployee();
                });
            } else {
                // return
                process.exit()
            }
        });
}

init();


