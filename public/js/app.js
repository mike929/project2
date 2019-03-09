$(document).ready(function () {

  // INIT SUBMIT BUTTON
  $('#submitButton').on('click', function (event) {
    console.log("ive been clicked")
    event.preventDefault();
  });
});
