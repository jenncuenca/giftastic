// Create an array named "topics"

var topics = ['dog', 'cat', 'squirrel', 'dolphin'];

//for loop for going through array to grab data to create buttons
function buttonCreation () {

    $('#buttons-view').empty();

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



});

