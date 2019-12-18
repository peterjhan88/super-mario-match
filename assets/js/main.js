$(document).ready(initializeApp);
let gameRound = 1;
let currentMatch = null;
let numberOfAttempts = null;
let accuracy = null;
const numberOfCards = 18;
const maxMatch = null;
const backgroundPictureUrl = 'url("./assets/images/bowser-red-face.png")';

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

  hideModal();

  for (let index = 0; index < numberOfCards; index++) {
    let $card = $('<div>').addClass('card');
    let $front = $('<div>').addClass('front');
    let $back = $('<div>').addClass('back')
                          .css({
                            'background-color': 'white',
                            'background-image': backgroundPictureUrl,
                            'background-size': 'contain',
                            'background-position': 'center',
                            'background-repeat': 'no-repeat'});
    $card.append($front,$back);
    $gameBoard.append($card);
  }
}

function hideModal(){
  $('.my-modal').addClass('hidden');
}
function showModal(){
  $('.my-modal').removeClass('hidden');
}

function handleClick(){
  checkMatch();
  if(currentMatch === maxMatch){
    showModal();
  }
}

function checkMatch(){
  console.log('checking cards...');
  updateMatch();
  updateAttempts();
  updateAccuracy();
}

function updateMatch(){
  currentMatch++;
}
function updateAttempts(){
  numberOfAttempts++;
  $('#')
}
function updateAccuracy(){
  if(numberOfAttempts===0){
    $('#accuracy').text('0 %');
  } else {
    accuracy = currentMatch/numberOfAttempts;
    $('#accuracy').text(accuracy+' %');
  }
}
