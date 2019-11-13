$(document).ready(initializeApp);
var firstCardClicked = null;
var secondCardClicked = null;

var matches = null;
var attempts = null;
var max_matches = 2;

var pictures = ["css-logo.png",'docker-logo.jpg','gitHub-logo.png',
                'html-logo.png','js-logo.png','mysql-logo.png',
                'node-logo.png','php-logo.jpeg','react-logo.png'];


function initializeApp(){
  $('.card').on("click", handleCardClick);


}

function handleCardClick(event){
  var selectedCard = $(event.currentTarget);
  selectedCard.find('.back').addClass("hidden");

  if (!firstCardClicked) {
    firstCardClicked = selectedCard.addClass('clicked');
  } else {
    secondCardClicked = selectedCard.addClass('clicked');
  }
  // debugger;
  if(firstCardClicked  &&  secondCardClicked){
    var firstCardUrl = firstCardClicked.find(".front").css("background-image");
    var secondCardUrl = secondCardClicked.find(".front").css("background-image");

    if (firstCardUrl !== secondCardUrl){ // no match
      console.log("NOPE!")
      setTimeout(function () {
        firstCardClicked.find('.back').removeClass("hidden");
        secondCardClicked.find('.back').removeClass("hidden");
        firstCardClicked.removeClass("chlicked");
        secondCardClicked.removeClass("clicked");
        firstCardClicked = null;
        secondCardClicked = null;
        // for later use, back to null
      }, 1000);
    } else {
      console.log("WOW!!!!!!");
      matches += 1;
      firstCardClicked.filter(".back").addClass("hidden");
      secondCardClicked.filter(".back").addClass("hidden");
      firstCardClicked = null;
      secondCardClicked = null;
    }
    attempts +=1;
    updateAttempts();
    updateMatch();
  }
}

function updateMatch(){
  var accuracy = Math.round(matches * 10000 / attempts) /100;
  $("#accuracy").text(accuracy+"%");
}

function updateAttempts(){
  $("#attempts").text(attempts);
}
