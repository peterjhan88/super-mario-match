$(document).ready(initializeApp);

function initializeApp(){

  $('.card > .back').on("click", handleCardClick);
}

function handleCardClick(event){
  var selectedCard = $(event.currentTarget);
  selectedCard.addClass("hidden");
  setTimeout(function(){selectedCard.removeClass("hidden");}, 3000);
}
