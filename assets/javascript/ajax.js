// Create an array named "topics"

var topics = ['koala', 'panda', 'tiger', 'dragon'];

//for loop for going through array to grab data to create buttons
function buttonCreation () {

    $('#buttons-view').empty(); //empties div

    for (var i =0; i < topics.length; i++){

    // buttons get created from "topics" array
    var newBtn = $('<button>').html(topics[i])
    newBtn.addClass('btn btn-info animal') // adds classes to an jquery html created element
    
    //button gets appended to html
    $('#buttons-view').append(newBtn)
    };
};

buttonCreation();

//user is able to create their own button using the FORM
$('#add-gif').on("click", function() {
    event.preventDefault(); // prevents form default from reloading page

    var formInput = $("#gif-input").val().trim(); // gets value of input box w/ chain

    // formInput added value to topics array
    topics.push(formInput);

    buttonCreation();
   
     //console.log(formInput)
});

$(document).on("click", '.animal', function(){
    var animal= $(this).html();
    
    console.log("animal btn clicked")
    console.log(animal)

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        
        $('#gifs-appear-here').empty();

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var animalDiv= $('<div>');
          var p= $('<p>').text(results[i].rating);
          var animalGif= $('<img>');
        
          animalGif.addClass('gif'); // adds .gif class to new gifs generated
          animalGif.attr("src", results[i].images.fixed_height.url);
          animalGif.attr('data-gif-state', 'animated');
          animalGif.attr('data-still-url', results[i].images.fixed_height_still.url);
          animalGif.attr('data-animated-url', results[i].images.fixed_height.url);

          animalDiv.append(p);
          animalDiv.append(animalGif);
          $('#gifs-appear-here').append(animalDiv);
      }

      console.log(results)
      
    });

    //console.log ("AFTER AJAX")

    // on-click image changes state
    $(document).on("click", '.gif', function(){

        var state = $(this).attr("data-gif-state");

        //check current state

        //if state is animated change to still state attr and scr
      if (state == "still") {
        $(this).attr("src", $(this).attr("data-animated-url"));
        $(this).attr("data-gif-state", "animated");
      }

       //if state is still change back to animated attr and scr
      else if (state == "animated") {
        $(this).attr("src", $(this).attr("data-still-url"));
        $(this).attr("data-gif-state", "still");
      }

        //console.log("hello")
    });

});

