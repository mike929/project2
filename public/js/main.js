// this block of code was brought in from the old app.js file that has been removed.
// this js file will hold all static page level javascript.
$(document).ready(function () {

  //   // INIT SUBMIT BUTTON
  //   $('#submitButton').on('click', function (event) {
  //     event.preventDefault();
  //     console.log($('#post').val())

  //   });
  // });


  // INIT SUBMIT BUTTON (this is the version in Oscar file)
  $('#submitButton').on('click', function (event) {
    event.preventDefault();
    var inputValue = $('#post').val();
    $.post('/', {
      userInput: inputValue
    }).done(function (score) {
      console.log(score)
      $('#submitButton').hide()
      // $('#home').text(score)
      // $('#modal2').text(score)
      $('#score').text(score)
      // $('#tweet').text(tweetArray)
      // $('#keywordTerm').text(keyword)

      // modalTest();     // TESTING - MIGHT NEED TO DELETE
    })
  });

  // FUNCTION - SUBMIT BUTTON CLICK TO OPEN MODAL (Sam's code)
  $("#submitButton").on('click', function (event) {
    event.preventDefault();
    $('#modal2').fadeIn('fast');
    $('#submitButton').hide('fast');

    // FUNCTION TO HIDE MODAL ONCE 'OK' IS CLICKED //
    $('#modalOkButton').on('click', function () {
      // HIDE MODAL
      $('#modal2').hide();
      $('#submitButton').show();
      // RESET FORM
      $('#modalOkButton').on('click', function () {
        $('.form-group').reset();

      });
    });
  });

  // $('hide').modal();

  // $('#modal2').modal(function {
  //   // FADE IN MODAL 
  //   $("#fade").modal({
  //     fadeDuration: 1000,
  //     fadeDelay: 0.50
  //   });

});



// PASS THE MODAL AFTER CLICKING THE SUBMIT BUTTON //
// function modalTest() {
// };

// $('#submitButton').on('click', function (event) {
//   event.preventDefault();
//   var inputValue = $('#post').val();
//   $.post('/modal', {
//     userInput: inputValue
//   }).done(function (score) {
//     console.log(score)
//     $('#home').text(score)
//   })
// });

// MODAL FUNCTION
$('.dropdown-button').dropdown({
  constrainWidth: false,
  hover: true,
  belowOrigin: true,
  alignment: 'left'
});

$('.modal').modal({
  dismissible: true,
  inDuration: 300,
  outDuration: 200,
  ready: function (modal, trigger) {
    console.log('Modal Opened', modal, trigger);
  }
});






// $(".slideInUp").click(function () {
//   $("h1").hide();
// });


// Get references to page elements
var $searchText = $("#search-text");
// var $searchDescription = $("#search-description");
var $submitBtn = $("#submit");
var $searchList = $("#search-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveSearch: function (search) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/searches",
      data: JSON.stringify(search)
    });
  },
  getSearch: function () {
    return $.ajax({
      url: "api/searches",
      type: "GET"
    });
  },
  deleteSearch: function (id) {
    return $.ajax({
      url: "api/searches/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshSearches = function () {
  API.getSearches().then(function (data) {
    var $search = data.map(function (search) {
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
var handleFormSubmit = function (event) {
  event.preventDefault();

  var search = {
    searchTerm: $searchText.val().trim(),
    // description: $searchDescription.val().trim()
  };

  if (!(search.text)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(search).then(function () {
    refreshSearches();
  });

  $searchText.val("");
  // $searchDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteSearch(idToDelete).then(function () {
    refreshSearches();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$searchList.on("click", ".delete", handleDeleteBtnClick);
