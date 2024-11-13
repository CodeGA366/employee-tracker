const inquirer = require('inquirer');
const { addDepartment, viewDepartments, deleteDepartment } = require('./lib/department');
const { addEmployee, viewAllEmployees, updateEmployeeRole,} = require('./lib/employee');

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
                await viewAllEmployees();
                break;
            case 'Add an employee':
                await addEmployee();
                break;
            case 'Update an employee role':
                await updateEmployeeRole();
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
module.exports = { mainMenu };
mainMenu();
