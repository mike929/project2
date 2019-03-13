


// INIT SUBMIT BUTTON


  $('#submitButton').on('click', function (event) {
    event.preventDefault();
    var inputValue = $('#post').val();
    console.log(inputValue)
    $.post("/api/searches", {userInput: inputValue})
  });
