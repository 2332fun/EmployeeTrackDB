const inquirer = require('inquirer');
const consoletable = require('console.table');
const mySQL = require('mysql2');
const DB = require('./db');
const db = require('./db');
const { black } = require('color-name');

//Presents the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

function directory() {
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
                {
                    name: 'View Roles',
                    value: 'view_roles'
                },
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
        switch (response.directoryChoice) {
            case 'view_employees':
                viewEmployees();
                break;
            case 'view_roles':
                viewRoles();
                break;
            case 'view_departments':
                viewDepartments();
                break;
            default:
                quit();
        }
    })
}

// After viewing the departments, decide to either add a department or return to the directory.

function departmentOrBack() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'departmentOrBack',
            message: 'Would you like to add a Department?',
            choices: [
                {
                    name: 'Add a Department.',
                    value: 'addDepartmentChoice',
                },
                {
                    name: 'Go back.',
                    value: 'back'
                }
            ]
        }
    ]).then((response) => {
        switch (response.departmentOrBack) {
            case 'addDepartmentChoice':
                addDepartment();
                break;
            case 'back':
                directory();
        }
    })
};

// After viewing the employees, decide to either add an employee or return to the directory.

function employeeOrBack() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeOrBack',
            message: 'Would you like to add or update an Employee?',
            choices: [
                {
                    name: 'Add an Employee.',
                    value: 'addEmployeeChoice'
                },
                {
                    name: 'Update an existing Employee.',
                    value: 'updateEmployeeChoice'
                },
                {
                    name: 'Go back.',
                    value: 'back'
                }
            ]
        }
    ]).then((response) => {
        switch (response.employeeOrBack) {
            case 'addEmployeeChoice':
                addEmployee();
                break;
            case 'updateEmployeeChoice':
                updateEmployee();
                break;
            case 'back':
                directory();
        }
    })
};

// After viewing the roles, decide to either add a role or return to the directory.

function roleOrBack() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'roleOrBack',
            message: 'Would you like to add a Role?',
            choices: [
                {
                    name: 'Add a Role.',
                    value: 'addRoleChoice'
                },
                {
                    name: 'Go back.',
                    value: 'back'
                }
            ]
        }
    ]).then((response) => {
        switch (response.roleOrBack) {
            case 'addRoleChoice':
                addRole();
                break;
            case 'back':
                directory();
        }
    })
};

// When viewing all departments, presents a formatted table showing department names and department ids

function viewDepartments() {
    db.findDepartments()
        .then((departments) => {
            console.table(departments);
            departmentOrBack();
        })
}

// When adding a department, prompts the user to enter the name of the department and that department is added to the database

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDep',
            message: 'What department would you like to add?'
        }
    ]).then((answers) => {
        let department = {
            dep_name: answers.addDep
        }
        db.newDepartment(department)
    }).then(() => {
        console.log("Added department to the database!");
        directory();
    })
}

// When viewing all roles, presents the job title, role id, the department that role belongs to, and the salary for that role

function viewRoles() {
    db.findRoles()
        .then((emp_role) => {
            console.table(emp_role);
            roleOrBack();
        })
}

// When adding a role, prompts the user to enter the name, salary, and department for the role and that role is added to the database

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addRole',
            message: 'What role would you like to add?'
        },
        {
            type: 'input',
            name: 'addSalary',
            message: 'How much salary does this role make?'
        }
    ]).then((roleSalaryAnswers) => {
        let title = roleSalaryAnswers.addRole
        let salary = roleSalaryAnswers.addSalary
        db.findDepartments()
            .then((departments) => {
                const departmentOptions = departments.map(({ id, dep_name }) => ({
                    name: dep_name,
                    value: id
                }))
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'addRoleDep',
                        message: 'What department does this role belong to?',
                        choices: departmentOptions
                    }
                ]).then((answers) => {
                    let emp_role = {
                        title: title,
                        salary: salary,
                        department_id: answers.addRoleDep
                    }
                    db.newRole(emp_role)
                    console.log("Added role to the database!");
                    directory();

                })
            })
    })
}

// When viewing all employees, presents a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.

function viewEmployees() {
    db.findEmployees()
        .then((employees) => {
            console.table(employees);
            employeeOrBack();
        })
}

// When adding an employee; prompts the user to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addEmployeeFirstName',
            message: 'What is the first name of the Employee?'
        },
        {
            type: 'input',
            name: 'addEmployeeLastName',
            message: 'What is the last name of the Employee?'
        }
    ]).then((answers) => {
        let first_name = answers.addEmployeeFirstName
        let last_name = answers.addEmployeeLastName
        db.findRoles()
            .then((roles) => {
                const roleOptions = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }))
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'addEmployeeRole',
                        message: 'What is the role of the Employee?',
                        choices: roleOptions
                    }
                ]).then((answers) => {
                    let roleID = answers.addEmployeeRole
                    db.findEmployees()
                        .then((employees) => {
                            const managerOptions = employees.map(({ id, first_name, last_name }) => ({
                                name: first_name + ' ' + last_name,
                                value: id
                            }))
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'addEmployeeManager',
                                    message: 'Who is the manager of the Employee?',
                                    choices: managerOptions
                                }
                            ]).then((answers) => {
                                let employee = {
                                    manager_id: answers.addEmployeeManager,
                                    role_id: roleID,
                                    first_name: first_name,
                                    last_name: last_name
                                }
                                db.newEmployee(employee)
                            }).then(() => {
                                console.log("Added employee to the database!");
                                directory();
                            })
                        })
                })

            })
    })
}

// When updating an employee role, prompts the user to select an employee to update their new role and this information is updated in the database.

function updateEmployee() {
    db.findEmployees()
        .then((employees) => {
            const updateOptions = employees.map(({ id, first_name, last_name }) => ({
                name: first_name + ' ' + last_name,
                value: id
            }))
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'updateEmployeeChoice',
                    message: 'Which employee would you like to update?',
                    choices: updateOptions
                }
            ]).then((emp_role) => {
                let empvar = {};
                for (let i = 0; i < employees.length; i++) {
                    if (employees[i].id == emp_role.updateEmployeeChoice) {
                        empvar = employees[i]
                    }
                }
                db.findRoles()
                    .then((roles) => {
                        const roleOptions = roles.map(({ id, title }) => ({
                            name: title,
                            value: id
                        }))
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'updateEmployeeRole',
                                message: 'What is their new role?',
                                choices: roleOptions
                            }
                        ]).then((answers) => {
                            let newRoleID = {
                                role_id: answers.updateEmployeeRole,
                                id: empvar.id
                            }
                            db.updateEmployee(newRoleID)
                                .then(() => {
                                    console.log("Updated the employee in the database!");
                                    directory();
                                })
                        })
                    })

            })
        })
}

function quit() {
    console.log("Goodbye!");
    process.exit(1);
}

directory();