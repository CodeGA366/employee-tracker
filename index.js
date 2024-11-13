const inquirer = require('inquirer');
const { addDepartment, viewDepartments, deleteDepartment } = require('./lib/department');
const { addEmployee, viewAllEmployees, updateEmployeeRole, promptUserForEmployeeDetails, promptUserForRoleUpdate} = require('./lib/employee');
const Employee = require('./lib/employee');

//main menu
const mainMenu =  async () =>{
    try{
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'Add a department',
                    'Delete a department',
                    'View all employees',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ]
            }
        ]);
        switch(answers.action) {
            case 'View all departments':
                await viewDepartments(mainMenu);
                break;
            case 'Add a department':
                const { name } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter the name of the department:'
                    }
                ]);
                await addDepartment(name, mainMenu);//add department
                break;
            case 'Delete a department':
                const { departmentId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'departmentId',
                        message: 'Enter the id of the department to delete:'
                    }
                ]);
                await deleteDepartment(departmentId, mainMenu);
                break;
            case 'View all employees':
                await viewAllEmployees(mainMenu);
                break;
            case 'Add an employee':
                await Employee.addEmployee(mainMenu);
                break;
            case 'Update an employee role':
                await Employee.updateEmployeeRole(mainMenu);
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
            default:
                break;
        }
    } catch (error) {
        console.error('error with main menu:', error);
    }
};

// Call main menu
console.log(mainMenu);
console.log(Employee);
console.log(typeof Employee.addEmployee);
module.exports = { mainMenu };
mainMenu();
