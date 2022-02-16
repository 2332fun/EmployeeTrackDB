const inquirer = require('inquirer');
const consoletable = require('console.table');
const mySQL = require('mysql2');
const DB = require('./db');
const db = require('./db');
const { black } = require('color-name');

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

function employeeOrBack(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeOrBack',
            message: 'Would you like to add an Employee?',
            choices: [
                {
                    name: 'Add an Employee.',
                    value: 'addEmployeeChoice',
                },
                {
                    name: 'Go back.',
                    value: 'back'
                }
            ]
        }
    ]).then ((response) => {
        switch (response.employeeOrBack){
            case 'addEmployeeChoice':
                addEmployee();
                break;
            case 'back':
                directory();
        }
    })
};


function viewDepartments(){
    db.findDepartments()
    .then(([departments]) => {
        console.table(departments);
        directory();
    })
}
function viewEmployees() {
    db.findEmployees()
    .then(([employees]) => {
        console.table(employees);
        employeeOrBack();
    })
}

function addEmployee() {
    console.log("Add Employee function code will be implemented later.");
    directory();
}

function quit() {
    console.log("Quit function code will be implemented later.");
}

directory();