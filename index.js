const inquirer = require('inquirer');
const consoletable = require('console.table');
const mySQL = require('mysql2');
const DB = require('./db');
const db = require('./db');

//create a directory
// what would you like to do?
// * view employees
// * view department
// * view roles

// View employees
// *Add
// *edit
// *delete


function directory () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'directoryChoice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View Employees',
                    value: 'view_employees'
                },
                {
                    name: 'View Departments',
                    value: 'view_departments'
                },
                {
                    name: 'Quit',
                    value: 'quit'
                }
            ]
        }
    ]).then((response) => {
        switch (response.directoryChoice){
            case 'view_employees':
                viewEmployees();
                break;
            case 'view_departments':
                viewDepartments();
                break;
            default:
                quit();
        }
    })
}


function viewDepartments(){
    db.findDepartments()
    .then(([departments]) => {
        console.table(departments);
    })
}
function viewEmployees() {}

function quit() {

}

directory();