var db = require("../models");

module.exports = function (app) {
  // Get all Searchs
  app.get("/api/Searchs", function (req, res) {
    db.
      findAll({})
      .then(function (dbSearch) {
        res.json(dbSearch);
      });
  });

  // Create a new Search
  app.post("/api/Searchs", function (req, res) {
    db.Search
      .create(req.body)
      .then(function (dbSearch) {
        res.json(dbSearch);
      });
  });

  // Delete an Search by id
  app.delete("/api/Searchs/:id", function (req, res) {
    db.Search
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbSearch) {
        res.json(dbSearch);
      });
  });
};
