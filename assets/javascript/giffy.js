$(document).on("click", ".sport-btn",".gif", displaySports); {

    $("#gif-view").hide();
}

// Initial array of sports
var sports = ["Wingsuit flying", "Field archery", "Gymnastics", "Hang gliding","Pickleball","Beach volleyball","Quidditch","Aid climbing","Sumo","Taekwondo"];

function displaySports() {

    var sport = $(this).attr("data-name");
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=oiM2ClHg2Eep6z2Pbfi8uR4kkEsv5zeO&limit=10";
  
    // Creating an AJAX call for the specific sport button being clicked.

    $.ajax ({
        url: queryUrl,
        method: "GET"
    }).then (function(response) {

        $("#gif-view").empty();
        $("#gif-view").show();
        // create a for to get the 10 elements from the data. 
        for (var i = 0; i < response.data.length; i++) {

            // Creating a div to hold the sport
            var sportDiv = $("<div class='sport'>");
            // Store the rating data
            var rating = response.data[i].rating;
            // Element to have the rating displayed
            var pRating = $("<p>").text("Rating: " + rating);
            // Displaying the rating
            sportDiv.append(pRating);
            // Retrieving the URL for the image
            var imgURL = response.data[i].images.fixed_width_still.url;
            var imgURLStill = response.data[i].images.fixed_width_still.url;
            var imgURLAnimate = response.data[i].images.fixed_width_downsampled.url;
            
            var image = $("<img>").attr("src", imgURL).attr("data-still",imgURLStill).attr("data-animate",imgURLAnimate).attr("data-state","still");

            image.addClass("gif");
          
            // Appending the image
            sportDiv.append(image);  

            // Putting the entire sport above the previous sports
            $("#gif-view").append(sportDiv);
       
        }
    });
}

 // Function for displaying movie data

function renderButtons() {

    // To dont repeat the buttons. 
    $("#buttons-view").empty();
 
    // Iterations over sports array. 
    for (var i = 0; i < sports.length; i++) {
        // create a buttons for the array. 

        var createButton = $("<button>");
        //add a class to the button: "sport-btn"

        createButton.addClass("sport-btn");
        // add data attribute. 
        createButton.attr("data-name", sports[i]);
        createButton.text(sports[i]);
        $("#buttons-view").append(createButton);
    }
}

renderButtons();

$("#add-sport").on("click", function (event) {
    // Prevent a submit button from submitting a form. Prevent a link from following the URL.
    event.preventDefault();

    // Get the input from the textbox
    var sport = $("#sport-input").val().trim();
    // Put the new user sport to our array
    sports.push(sport);
    // Call the render buttons.
    renderButtons();
});

$(".gif").on("click", function() {
    
    var state = $(this).attr("data-state");
 
    
    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state","animate")
      
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state","still")
    }

console.log("hello");

});

