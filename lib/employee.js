const db = require('../db/connection.js'); // import connection
const inquirer = require('inquirer'); // import inquirer
// function to prompt users for employee role update
async function promptUserForRoleUpdate() {
    const employeeQuery = 'SELECT id, first_name, last_name FROM employee';
    const employeeResult = await db.query(employeeQuery);
    const employees = employeeResult.rows.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id
    }));
    const { employeeId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to update:',
            choices: employees
        }
    ]);
    const roleQuery = 'SELECT id, title FROM role';
    const roleResult = await db.query(roleQuery);
    const roles = roleResult.rows.map(role => ({
        name: role.title,
        value: role.id
    }));
    const { newRoleId } = await inquirer.prompt({
        type: 'list',
        name: 'newRoleId',
        message: 'Select a new role for the employee:',
        choices: roles
    });
    return { employeeId, newRoleId };
}
// funtion to propmt users for employee information
async function promptUserForEmployeeDetails() {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee:',
            validate: input => input ? true : 'First name cannot be empty'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee:',
            validate: input => input ? true : 'Last name cannot be empty'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role id of the employee:',
            validate: input => !isNaN(input) ? true : 'Role id must be a number'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager id of the employee:',
            validate: input => input === '' || !isNaN(input) ? true : 'Manager id must be a number or left blank'
        },
    ]);
    return {
        firstName,
        lastName,
        roleId: parseInt(roleId),
        managerId: managerId ? parseInt(managerId) : null,
    };
};
// create the Employee class
class Employee {
    // Function to view all employees
    static async viewAllEmployees(mainMenu) {
        const query =`
            SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id 
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
        `;
        try {
            const result = await db.query(query);
            console.table(result.rows);
        } catch (error) {
            console.error("error fetching employees:", error);
        } finally{
            if (typeof mainMenu === 'function') {
                mainMenu();
            } else {
                console.log('mainMenu is not a function');
            }
        }
    }
        //Function to add an employee
    static async addEmployee (mainMenu) {
        const { firstName, lastName, roleId, managerId } = await promptUserForEmployeeDetails();

        //check if the role id exists
        const roleCheckQuery = 'SELECT * FROM role WHERE id = $1';
        const roleCheckResult = await db.query(roleCheckQuery, [roleId]);

        if (roleCheckResult.rows.length === 0) {
            console.error(`Role with id ${roleId} does not exist`);
            return;
        }

        const query = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        try {
            const result = await db.query(query, [firstName, lastName, roleId, managerId]);
            console.log("Employee added:", result.rows[0]);
        }catch (error) {
            console.error("error adding employee:", error);
        } finally {
            if (typeof mainMenu === 'function') {
                mainMenu();
            } else {
                console.log('mainMenu is not a function');
            }
        }
    }
    //fucntion to update employee role
    static async updateEmployeeRole(mainMenu) {
        const { employeeId, newRoleId } = await promptUserForRoleUpdate();
        //check if the role id exists
        const roleCheckQuery = 'SELECT * FROM role WHERE id = $1';
        const roleCheckResult = await db.query(roleCheckQuery, [newRoleId]);
        if (roleCheckResult.rows.length === 0) {
            console.error(`Role with id ${newRoleId} does not exist`);
            return;
        }
        const query = `
            UPDATE employee
            SET role_id = $1
            WHERE id = $2
            RETURNING *;
        `;
        try {
            const result = await db.query(query, [newRoleId, employeeId]);
            if (result.rows.length > 0) {
                console.log('Employee role updated:', result.rows[0]);
            }else {
                console.log('Employee not found');
            }
        } catch (error) {
            console.error('error updating employee role:', error);
        } finally {
            if (typeof mainMenu === 'function') {
                mainMenu();
            } else {
                console.log('mainMenu is not a function');
            }
        }
    }
}
console.log(Employee);
console.log(typeof Employee.addEmployee);
module.exports = Employee;
