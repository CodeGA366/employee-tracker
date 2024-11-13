-- Insert data into the department table
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Human Resources'),
('Marketing');

-- Insert data into the role table
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 80000, 1),
('Sales Associate', 50000, 1),
('Software Engineer', 90000, 2),
('Senior Software Engineer', 120000, 2),
('HR Manager', 70000, 3),
('Recruiter', 60000, 3),
('Marketing Manager', 75000, 4),
('Marketing Associate', 50000, 4);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),  -- John is a Sales Manager with no manager
('Jane', 'Smith', 2, 1),   -- Jane is a Sales Associate under John
('Alice', 'Johnson', 3, NULL),  -- Alice is a Software Engineer with no manager
('Bob', 'Williams', 4, 3),  -- Bob is a Senior Software Engineer under Alice
('Charlie', 'Brown', 5, NULL),  -- Charlie is an HR Manager with no manager
('David', 'Davis', 6, 5),  -- David is a Recruiter under Charlie
('Eve', 'White', 7, NULL),  -- Eve is a Marketing Manager with no manager
('Frank', 'Black', 8, 7);  -- Frank is a Marketing Associate under Eve