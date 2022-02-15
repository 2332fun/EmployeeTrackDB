const mySQL = require('mysql2');
const connection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySQLPW2332',
    database: 'employeeDB'
});

connection.connect(function (error){
    if (error) throw error
});

module.exports = connection;