var db = require("../models");

module.exports = function (app) {
  // Get all Searches
  app.get("/api/searches", function (req, res) {
    db.Analysis
      .findAll({})
      .then(function (dbsearches) {
        res.json(dbsearches);
      });
  });

  // Create a new searches
  app.post("/api/searches", function (req, res) {
    db.Analysis
      .create(req.body)
      .then(function (dbsearches) {
        res.json(dbsearches);
      });
  });

  // Delete an searches by id
  app.delete("/api/searches/:id", function (req, res) {
    db.Analysis
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbsearches) {
        res.json(dbsearches);
      });
  });
};
