USE employee_db;

INSERT INTO department (name)
VALUES 
    ("Front-Desk"),
    ("Cashere"),
    ("Pro Audio"),
    ("Guitar"),
    ("Band and Orchestra"),
    ("Drums"),
    ("Education"),
    ("Wharehouse");

INSERT INTO role (title, salary, department_id)
VALUES  
    ("Manager", 140000, 1),
    ("Employee", 60000, 1),
    ("Manager", 110000, 2),
    ("Employee", 25000, 2),
    ("Manager", 110000, 3),
    ("Employee", 25000, 3),
    ("Manager", 105000, 4),
    ("Employee", 30000, 4);
 
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES     
    ('Billy', 'Johnson', 1, NULL),
    ('Jason', 'Green', 2, 1),
    ('David', 'Copperfield', 3, NULL),
    ('Ron', 'White', 4, 3),
    ('Jerry', 'Carfield', 5, NULL),
    ('Jose', 'Altuve', 6, 5);
  
