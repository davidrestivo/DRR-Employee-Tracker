SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee
JOIN role ON role.id = employee.role_id
JOIN department ON department.id = role.department_id;

INSERT INTO department (name)
  VALUES ("name");

INSERT INTO department (title, salary, department_id)
  VALUES ("title", "salary", "department_id");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ("first_name", "last_name", "role_id", "manager_id");

UPDATE employee
SET role = "${updateRole}"
WHERE employee_id = ${updateID};