const inquirer = require('inquirer');
const consoletable = require('console.table');
const mySQL = require('mysql2');
const DB = require('./db');
const db = require('./db');
const { black } = require('color-name');

//THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

function directory () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'directoryChoice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View Departments',
                    value: 'view_departments'
                },
                // {
                //     name: 'View Roles',
                //     value: 'view_roles'
                // },
                {
                    name: 'View Employees',
                    value: 'view_employees'
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
    .then((departments) => {
        console.table(departments);
        directory();
    })
}
function viewEmployees() {
    db.findEmployees()
    .then((employees) => {
        console.table(employees);
        employeeOrBack();
    })
}

function addEmployee() {
    console.log("Add Employee function code will be implemented later.");
    directory();
}

function quit() {
    console.log("Goodbye!");
    process.exit(1);
}

directory();