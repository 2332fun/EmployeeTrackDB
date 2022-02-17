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

    //Presents a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.

    findEmployees() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, emp_role.salary, department.dep_name AS department, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee LEFT JOIN emp_role ON employee.role_id = emp_role.id LEFT JOIN department ON emp_role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id',
                (error, data) => {
                    resolve(data);
                }
            )
        })
    }

}

module.exports = new DB(connection);