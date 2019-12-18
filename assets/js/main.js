$(document).ready(initializeApp);
const numberOfCards = 18;
const maxMatch = 9;
const backgroundPictureUrl = 'url("./assets/images/bowser-red-face.png")';

let gameRound = 1;
let currentMatch = null;
let numberOfAttempts = null;
let accuracy = null;
let clickedCards = [];

function initializeApp(){
  addClickHandler();
  newGame();
}

function addClickHandler(){
  $('#reset-button').on('click', newGame);
  $('#game-board').on('click', '.card', handleClick);
}

function newGame(){
  let $gameBoard = $('#game-board');
  $gameBoard.empty();
  gameRound = 1;
  currentMatch = null;
  numberOfAttempts = null;
  accuracy = null;
  clickedCards = [];

  hideModal();

  for (let index = 0; index < numberOfCards; index++) {
    let $card = $('<div>').addClass('card');
    let $front = $('<div>').addClass('front');
    let $back = $('<div>').addClass('back')
                          .css({
                            'background-color': 'white',
                            'background-image': backgroundPictureUrl,
                            'background-size': '100% 100%',
                            'background-position': 'center',
                            'background-repeat': 'no-repeat'});
    $card.append($front,$back);
    $gameBoard.append($card);
  }
}
function handleClick() {
  updateStats();
  if (currentMatch === maxMatch) {
    showModal();
    return;
  }
  if (clickedCards.length !== 2) {
    clickedCards.push('hi');
  } else {

    clickedCards = [];
  }
}

const hideModal = () => {
  $('.my-modal').addClass('hidden');
}
const showModal = () => {
  $('.my-modal').removeClass('hidden');
}

const updateStats = () => {
  console.log('updating stats...');
  updateMatch();
  updateAttempts();
  updateAccuracy();
}

const updateMatch = () => {
  currentMatch++;
  $('#current-match').text(currentMatch);
}

const updateAttempts = () => {
  numberOfAttempts++;
  $('#number-of-attempts').text(numberOfAttempts)
}

const updateAccuracy = () => {
  if(numberOfAttempts===0){
    $('#accuracy').text('0 %');
  } else {
    accuracy = currentMatch/numberOfAttempts * 100;
    $('#accuracy').text(accuracy+' %');
  }
}

const checkCardsMatch = () => {
  console.log("checking match");
}
