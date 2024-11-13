const db = require('../db/connection.js'); // import connection

// create the Employee class
class Employee {
    // Function to view all employees
    static async viewAllEmployees() {
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
        }
        }
        //Function to add an employee
    static async addEmployee(firstName, lastName, roleId, managerId) {
        const query = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        try {
            const result = await db.query(query, [firstName, lastName, roleId, managerId]);
            console.log("Employee added:", result.rows[0]);
        } catch (error) {
            console.error("error adding employee:", error);
        }
    }
    //fucntion to update employee role
    static async updateEmployeeRole(employeeId, newRoleId) {
        const query = `
            UPDATE employee
            SET role_id = $1
            WHERE id = $2
            RETURNING *;
        `;
        try {
            const result = await db.query(query, [newRoleId, employeeId]);
            console.log("Employee role updated:", result.rows[0]);
        } catch (error) {
            console.error("error updating employee role:", error);
        }   
    }
}

module.exports = Employee;