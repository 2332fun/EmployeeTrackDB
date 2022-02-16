const connection = require('./connection');

//CLASS
class DB {
    constructor (connection){
        this.connection = connection;
    }

    //build query for each database call

    findDepartments(){
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM department', (error, data) => {
                resolve(data);
            })
        })

    }

    findEmployees(){
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM employee', (error, data) => {
                resolve(data);
            })
        })
    }

}

module.exports = new DB(connection);