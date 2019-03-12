"use strict";
var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    searchTerm: {
      type: DataTypes.STRING,
      timestamps: true,
      // AllowNull is a flag that restricts a search from being entered if it doesn't
      // have a text value
      allowNull: false,
      // len is a validation that checks that our search is between 1 and 140 characters
      validate: {
        len: [1, 140]
      }
    },
    tweets: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    date: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultVlaue: Date.now()
    },

  
    // timestamps: true
    // // classMethods: {
    // //   associate: function (models) {
    // //     // associations can be defined here
    // //   }
    // },
    good: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    bad: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },


  });
  return Search;
};

// module.exports = search;
