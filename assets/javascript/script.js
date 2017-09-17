 
//Array of books
 var books = ["Jane Eyre", "East of Eden", "Harry Potter and the Order of the Phoenix", "Persuasion",
     "The Adventures of Huckleberry Finn"];

 var bookName;

//function to create books array into buttons
 function renderButtons() {

             $("#book-view").empty();

             for (i = 0; i < books.length; i++) {
                 console.log(books[i]);

                 var bookButton = $("<button>");
                 bookButton.addClass("book");
                 bookButton.attr("data-name", books[i]);
                 bookButton.text(books[i]);
                 $("#book-view").append(bookButton);
             }
         }
//function to add a new book to the books array and therefore, become a button
            $("#add-book").on("click", function(event) {

//preventing page refresh
              event.preventDefault();

              var reading = $("#book-input").val().trim();

              books.push(reading);

              renderButtons();
         });

//API Call and AJAX Get Request--> Note: I had my gifs populating the page, but I must have deleted something by accident, 
//because when I add in this function, 
//I lose the above buttons from my renderButtons function. WHY?!

$(".book").on("click", function(event) {

             bookName = $(this).attr("data-name");
             var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + bookName + "&api_key=dc6zaTOxFJmzC&limit=10";
             
             $.ajax({
                     url: queryURL,
                     method: "GET"
                 }).done(function(response) {

                         var results = response.data;

                         for (var i = 0; i < response.length; i++) {

                       //Storing moving gifs and still images into their own variables
                            var gifMove = response.data[i].images.fixed_height.url;
                            var gifStill = response.data[i]fixed_width_still.url;

                       //Creating Div for all gifs to sit in when they populate page              
                            var gifDiv = $("<div class='item'>");
                      
                      //Creating image element for individual gifs and giving each one the 
                      //attributes and gif class needed to animate later on     
                            var gifImg = $("<img>");
                                gifImg.attr("src": gifStill),
                                gifImg.attr("data-animate": gifMove),
                                gifImg.attr("data-state": "still"),
                                gifImg.addClass(".gif");
                         
                      //Storing rating and adding it to the beginning of each gif
                            var rating = response.data[i].rating;
                            var p = $("<p>").text("Rating: " + rating);
                                gifDiv.append(p);
                                gifDiv.append(gifImg);
                                $("#gifs-appear-here").prepend(gifDiv);
              }
      });
    });

//function to change state of gifs when clicked. if user clicks gif, it animates.
function moveGif () {
      
      var state = $(this).attr("data-state");
     
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    };

//whenever anything with gif class clicked moveGif function runs
$(document).on("click", ".gif", moveGif);

//calling renderButtons function
renderButtons();
         