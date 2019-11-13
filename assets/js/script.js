$(document).ready(initializeApp);
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

function initializeApp(){

  $('.card > .back').on("click", handleCardClick);
}

function handleCardClick(event){

  var selectedCard = $(event.currentTarget);
  selectedCard.addClass("hidden");

  if (!firstCardClicked) {
    firstCardClicked = $(event.currentTarget).parent().children().find(".front");
  } else {
    secondCardClicked = $(event.currentTarget).parent().children().find(".front");
  }
  if (firstCardClicked && secondCardClicked){
    var firstCardUrl = $(firstCardClicked).css("background-image");
    var secondCardUrl = $(secondCardClicked).css("background-image");
    if(firstCardUrl===secondCardUrl){
      console.log("cards match");
      matches+=1;
      firstCardClicked.addClass("hidden");
      secondCardClicked.addClass("hidden");
      firstCardClicked=null;
      secondCardClicked=null;
    } else {
      setTimeout(function(){selectedCard.removeClass("hidden");}, 3000);
      firstCardClicked = null;
      secondCardClicked = null;
    }
  } else {
    setTimeout(function(){selectedCard.removeClass("hidden");}, 3000);
    firstCardClicked = null;
    secondCardClicked = null;
  }
}
