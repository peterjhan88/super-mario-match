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

  $('main').on("click", ".card", handleCardClick);
  $("#myModalBtnYes").on("click", newGame);
  $("#myModalBtnNo").on("click", closeModal);
}

function handleCardClick(event){
  var selectedCard = $(event.currentTarget);
  selectedCard.find('.back').addClass("hidden");
  if (!firstCardClicked && !selectedCard.hasClass('clicked')) {
    firstCardClicked = selectedCard;
    firstCardClicked.addClass('clicked');
    return;
  } else if (!selectedCard.hasClass('clicked') && !secondCardClicked){
    secondCardClicked = selectedCard.addClass('clicked');
  }

  if(firstCardClicked  &&  secondCardClicked){
    var firstCardUrl = firstCardClicked.find(".front").css("background-image");
    var secondCardUrl = secondCardClicked.find(".front").css("background-image");

    if (firstCardUrl !== secondCardUrl){
      $("div.container").addClass("pointerEventDisabled");
      setTimeout(function () {
        firstCardClicked.find('.back').removeClass("hidden");
        secondCardClicked.find('.back').removeClass("hidden");
        firstCardClicked.removeClass("clicked");
        secondCardClicked.removeClass("clicked");
        firstCardClicked = null;
        secondCardClicked = null;
        $("div.container").removeClass("pointerEventDisabled");
      }, 1000);
    } else {
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
    showModal();
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
  // game round should only be incremental, unless the page is fully reloaded.
  $('#gameRounds').text(gameNumber);
  gameNumber++;
}

function showModal(){
  $('.myModal').removeClass('hidden');
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
  cardSlotCreation();

  //reset stats value, except game round
  matches = 0;
  attempts = 0;
  updateAttempts();
  updateMatch();
  updateGamePlayed();

  //new randomized pictures
  var randomArrayOfPictures = randomOrder(pictures.concat(pictures));
  populateCards(randomArrayOfPictures);

  //hide modal
  closeModal();

  // now all cards should be not clicked
  $('.card').removeClass('clicked');

  // necessary to show all card when game starts
  $('.card > .back').addClass('hidden');
  setTimeout(function () {
    $('.card > .back').removeClass('hidden');
  },1000);

  $("div.container").removeClass("pointerEventDisabled");
}

function showmethemoney(){
  $('.card > .back').addClass('hidden');
}

function cardSlotCreation(){
  var newContainer = $('<div>').addClass('container');
  for(var index=0; index<18; index++){
    var cardDiv = $('<div>').addClass('card');
    var frontCard = $('<div>').addClass('front');
    var backCard = $('<div>').addClass('back');
    cardDiv.append(frontCard, backCard)
    newContainer.append(cardDiv);
  }
  $('main > div.container').replaceWith(newContainer);
}
