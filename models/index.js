"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
// var config = require(__dirname + "/../config/config.json")[env];
// const env = process.env.NODE_ENV; // 'dev' or 'test'

var db = {};

const sequelize = new Sequelize('analysisdb', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// var db = {};

// if (process.env.JAWDB_URL) {
//   // var sequelize = new Sequelize(process.env);
//   // for use when deployed to heroku
//   var sequelize = new Sequelize(process.env.JAWDB_URL, {dialect: 'mysql'});
// } else {
//   var sequelize = new Sequelize(
//     process.env.database,
//     process.env.username,
//     process.env.password
    
//   );
// }

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;