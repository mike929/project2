module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    searchTerm: DataTypes.STRING,
  });
  return Search;
};
