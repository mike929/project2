var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Analysis.findAll({}).then(function (searches) {
      res.render("index", {
        msg: "Welcome!",
        search: searches
      });
    });
  });

  // Load Search page and pass in a Search by id
  app.get("/search/:id", function (req, res) {
    db.Analysis
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbAnalysis) {
        res.render("search", {
          search: dbAnalysis
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};