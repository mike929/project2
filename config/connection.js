var mysql = require("mysql");
require("dotenv").config();
// var connection;

if (process.env.JAWSDB_URL) {
  // Database is JawsDB on Heroku
  console.log("Using JAWSDB");
  config = process.env.JAWSDB_URL;
} else {
  // Database is local
  console.log("Using Local DB");
  config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",      
    database: "analysis_db"
  };
}
connection = mysql.createConnection(config);

module.exports = connection;



// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var sequelize = new Sequelize("sequelize_library", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;




