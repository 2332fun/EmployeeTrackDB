const { resolve } = require('path/posix');
const connection = require('./connection');

//CLASS for database
class DB {
    constructor (connection){
        this.connection = connection;
    }

    findDepartments(){
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM department', (error, data) => {
                resolve(data);
            })
        })

    }

    //displays employee table

    findEmployees() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, emp_role.salary, department.dep_name AS department, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee LEFT JOIN emp_role ON employee.role_id = emp_role.id LEFT JOIN department ON emp_role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id',
                (error, data) => {
                    resolve(data);
                }
            )
        })
    }

    //adds new employee to table

    newEmployee(employee) {
        return new Promise ((resolve, reject) => {
            this.connection.query('INSERT INTO employee SET ?', employee,
            (error, data) => {
                resolve(data);
            }
            )
        })
    }

    //adds new department to table

    newDepartment(department) {
        return new Promise ((resolve, reject) => {
            this.connection.query('INSERT INTO department SET ?', department,
            (error, data) => {
                resolve(data);
            })
        })
    }

    //adds new role to table

    newRole(emp_role) {
        return new Promise ((resolve, reject) => {
            this.connection.query('INSERT INTO emp_role SET ?', emp_role,
            (error, data) => {
                resolve(data);
            })
        })
    }
    
    // WHEN I choose to update an employee role
    // THEN I am prompted to select an employee to update and their new role and this information is updated in the database

    findRoles() {
        return new Promise ((resolve, reject) => {
            this.connection.query('SELECT emp_role.title, emp_role.salary, department.dep_name AS department FROM emp_role LEFT JOIN department ON emp_role.department_id = department.id',
            (error, data) => {
                resolve(data);
            }
            )
    })
}

}

module.exports = new DB(connection);