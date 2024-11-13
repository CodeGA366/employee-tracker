const db = require('../db/connection.js');
const inquirer = require('inquirer');



//function to add a department
const addDepartment = async (departmentName, mainMenu) => {
    try{
        const result = await db.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [departmentName]);
        console.log(`Department '${result.rows[0].name}' added!`);
    } catch (error) {
        console.error('error adding department:', error);
    } finally {
        if (typeof mainMenu === 'function') {
            mainMenu();
        } else {
            console.log('mainMenu is not a function');
        }
    }
};

//function to view all departments
const viewDepartments =  async (mainMenu) => {
    try{
        const result = await db.query('SELECT id, name::text AS name FROM department');
        console.table(result.rows.map(row =>({
            id: row.id,
            name: row.name})));//display the result in a table
    } catch (error) {
        console.error('error viewing departments:', error);
    }finally{
        if (typeof mainMenu === 'function') {
            mainMenu();
        } else {
            console.log('mainMenu is not a function');
        }
    } 
};

//function to delete a department
const deleteDepartment =  async (departmentId, mainMenu) => {
    try{
        const result = await db.query('DELETE FROM department WHERE id = $1 returning *', [departmentId]);
        if(result.rowCount > 0) {
            console.log(`department with id ${departmentId} deleted!`);
        }else{
            console.log(`Department with id ${departmentId} not found!`);
        }
    } catch (error) {
        console.error('error deleting department:', error);
    } finally{
        if (typeof mainMenu === 'function'){
            mainMenu();
        } else {
            console.log('mainMenu is not a function');
        }
    }
};

module.exports = {
    addDepartment,
    viewDepartments,
    deleteDepartment
};