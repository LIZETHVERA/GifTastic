$(document).on("click", ".sport-btn", ".gif", displaySports); {

    $("#gif-view").hide();
}

var chooseGif = true;
var favorite;

// Initial array of sports
var sports = ["Wingsuit flying", "Field archery", "Gymnastics", "Hang gliding", "Pickleball", "Beach volleyball", "Quidditch", "Aid climbing", "Sumo", "Taekwondo"];

function addToFavorites ($target) {
             
    return function() {
        $target.appendTo(".card-body");
        $target.addClass("favorite");
    }
 
}

function displaySports() {

    var offset = Math.floor((Math.random() * 100) + 1);
    var sport = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=oiM2ClHg2Eep6z2Pbfi8uR4kkEsv5zeO&limit=10&offset=" + offset;

    // Creating an AJAX call for the specific sport button being clicked.
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        $("#gif-view").empty();
        $("#gif-view").show();
        // create a for to get the 10 elements from the data. 
        for (var i = 0; i < response.data.length; i++) {

            // Creating a div to hold the sport
            var sportDiv = $("<div class='sport'>");

            sportDiv.data('title', response.data[i].title);

            var sportDiv = $("<div class='gif-title'>").text(response.data[i].title);
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

            var image = $("<img>").attr("src", imgURL).attr("data-still", imgURLStill).attr("data-animate", imgURLAnimate).attr("data-state", "still");

            image.addClass("gif");

            var download = $("<button>").addClass("btn").text("Download");


            var favorite = $("<button>").addClass("btn-fav").text("favorite");
            // Appending the image and the button. 
            sportDiv.append(image, download, favorite);

            // Putting the entire sport above the previous sports.
            $("#gif-view").append(sportDiv);

         
            download.on("click", function (event) {
                event.preventDefault();
                //var element = $("<a>").attr("href", imgURLAnimate);
                //$(this).append(element);
                           
                window.location.href = imgURLAnimate
              
            });

            favorite.on("click", addToFavorites(sportDiv));
            
            // sportDiv.on("click", function (){
                             
            //     $(this).appendTo(".card-body");
            //     sportDiv.addClass("favorite");
             
            // });
        }



        $(".gif").on("click", function () {

            var state = $(this).attr("data-state");

            if (state == "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate")

            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still")
            }
        });

        

  
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

        console.log(createButton);
        
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



