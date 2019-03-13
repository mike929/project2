var db = require("../models");

var streamingTwitterFromWord = require("../twiterApi");

module.exports = function (app) {
  // Get all Searches
  app.post("/api/searches", function (req, res) {
    console.log(req.body)
    // db.Search
    //   .findAll({})
    //   .then(function (dbsearches) {
    //     res.json(dbsearches);
    //   });
    streamingTwitterFromWord(req.body.userInput)
  });

  // Create a new searches
  app.post("/", function (req, res) {
    db.Search
      .create(req.body)
      .then(function (dbsearches) {
        res.json(dbsearches);
      });
  });



  // Delete an searches by id
  app.delete("/api/searches/:id", function (req, res) {
    db.Search
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
