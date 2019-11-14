$(document).ready(initializeApp);
var firstCardClicked = null;
var secondCardClicked = null;

var matches = null;
var attempts = 0;
var max_matches = 9;
var gameNumber = 1;

var pictures = ["css-logo.png",'docker-logo.jpg','gitHub-logo.png',
                'html-logo.png','js-logo.png','mysql-logo.jpg',
                'node-logo.png','php-logo.jpeg','react-logo.png'];

function initializeApp(){
  newGame();

  $('.card').on("click", handleCardClick);
  $("#myModalBtnYes").on("click", newGame);
  $("#myModalBtnNo").on("click", closeModal);
}

function handleCardClick(event){
  var selectedCard = $(event.currentTarget);
  selectedCard.find('.back').addClass("hidden");
  if (!firstCardClicked) {
    firstCardClicked = selectedCard.addClass('clicked');
    return;
  } else if (!selectedCard.hasClass('clicked') && !secondCardClicked){
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
        firstCardClicked.removeClass("clicked");
        secondCardClicked.removeClass("clicked");
        firstCardClicked = null;
        secondCardClicked = null;
        // for later use, back to null
      }, 500);
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

  if(matches === max_matches){
    $('.myModal').removeClass('hidden');
  }
}

function updateMatch(){
  if(attempts!==0){
    var accuracy = Math.round(matches * 10000 / attempts) /100;
    $("#accuracy").text(accuracy+"%");
  } else {
    $("#accuracy").text(0+"%");
  }
}

function updateAttempts(){
  $("#attempts").text(attempts);
}

function updateGamePlayed() {
  $('#gameRounds').text(gameNumber);
  gameNumber++;
}

function closeModal(){
  $('.myModal').addClass("hidden");
}

function randomOrder(picturesArr) {
  var copyOfPicturesArr = JSON.parse(JSON.stringify(picturesArr));
  var newRandomizedArr = [];
  while (copyOfPicturesArr.length !== 0) {
    var randomIndex = Math.floor(Math.random() * copyOfPicturesArr.length);
    newRandomizedArr.push(copyOfPicturesArr[randomIndex]);
    copyOfPicturesArr.splice(randomIndex, 1);
  }
  return newRandomizedArr;
}

function populateCards(picturesArray){
  var all_cards = $('.card');
  var frontCardDivs = all_cards.find(".front");
  var pathFront = "url('./assets/images/";
  var completePath = "";

  for (var index = 0; index < frontCardDivs.length; index++){
    completePath = pathFront + picturesArray[index] +"')"
    $(frontCardDivs[index]).css({
      "background-image": completePath
    })
  }
}

function newGame() {
  matches = 0;
  attempts = 0;
  updateAttempts();
  updateMatch();
  updateGamePlayed();
  var randomArrayOfPictures = randomOrder(pictures.concat(pictures));
  populateCards(randomArrayOfPictures);
  closeModal();
  $('.card > .back').removeClass('hidden');
  $('.card').removeClass('clicked');
}
