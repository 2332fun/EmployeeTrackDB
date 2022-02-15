const connection = require('./connection');

//CLASS
class DB {
    constructor (connection){
        this.connection = connection;
    }
}

module.exports = new DB(connection);