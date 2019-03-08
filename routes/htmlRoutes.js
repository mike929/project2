var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Search.findAll({}).then(function (dbSearchs) {
      res.render("index", {
        msg: "Welcome!",
        searches: dbSearchs
      });
    });
  });

  // Load Search page and pass in a Search by id
  app.get("/Search/:id", function (req, res) {
    db
      .search
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbSearch) {
        res.render("Search", {
          search: dbSearch
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};