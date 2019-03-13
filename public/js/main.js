
// this block of code was brought in from the old app.js file that has been removed.
// this js file will hold all static page level javascript.
$(document).ready(function () {

  // INIT SUBMIT BUTTON
  $('#submitButton').on('click', function (event) {
    event.preventDefault();
    console.log($('#post').val())


  });
});




// Get references to page elements
var $searchText = $("#search-text");
// var $searchDescription = $("#search-description");
var $submitBtn = $("#submit");
var $searchList = $("#search-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveSearch: function(search) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/searches",
      data: JSON.stringify(search)
    });
  },
  getSearch: function() {
    return $.ajax({
      url: "api/searches",
      type: "GET"
    });
  },
  deleteSearch: function(id) {
    return $.ajax({
      url: "api/searches/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshSearches = function() {
  API.getSearches().then(function(data) {
    var $search = data.map(function(search) {
      var $a = $("<a>")
        .text(search.text)
        .attr("href", "/search/" + search.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": search.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $searchList.empty();
    $searchList.append($searches);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var search = {
    searchTerm: $searchText.val().trim(),
    // description: $searchDescription.val().trim()
  };

  if (!(search.text)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(search).then(function() {
    refreshSearches();
  });

  $searchText.val("");
  // $searchDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteSearch(idToDelete).then(function() {
    refreshSearches();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$searchList.on("click", ".delete", handleDeleteBtnClick);
