$(document).ready(initializeApp);
const numberOfCards = 18;
const maxMatch = 2;
const marioEnemies = [];

let gameRound = 0;
let currentMatch = 0;
let numberOfAttempts = 0;
let accuracy = 0;
let clickedCards = [];
// bullet-bill, chain-chomp, boo, bob-omb, cheep-cheep, koopa-troopa,
// buzzy-beetle, blooper, goomba, piranha plant, kamek, thwomp,
// shy-guy, podoboo
function initializeApp() {
  addClickHandler();
  newGame();
}

const addClickHandler = () => {
  $('.my-body').on('click', '#reset-button', newGame);
  $('#game-board').on('click', '.card', handleClick);
}

const newGame = () => {
  console.log('creating new game...');
  let $gameBoard = $('#game-board');
  $gameBoard.empty();
  gameRound++;
  currentMatch = 0;
  numberOfAttempts = 0;
  accuracy = 0;
  clickedCards = [];

  hideModal();

  for (let index = 0; index < numberOfCards; index++) {
    let card = new Card('front card url should be here');
    card.render();
  }
  updateStats();
}

const handleClick = (event) => {
  let $clickedCard = $(event.currentTarget);
  $clickedCard.find('.back').addClass('hidden');

  clickedCards.push('hi');
  console.log(clickedCards);
  if (clickedCards.length === 2){
    checkCardsMatch();
    clickedCards = [];
  }
  updateStats();
  if (currentMatch === maxMatch) {
    showModal();
  }
}

const hideModal = () => {
  $('.my-modal').remove();
}

const showModal = () => {
  let $modal = $('<div>').addClass('my-modal');
  let $modalBody = $('<div>').addClass('modal-body');
  let $modalTitle = $('<div>').addClass('modal-title').text('You are the winner!');
  let $modalContent = $('<div>').addClass('modal-content').text(`You won Game Round ${gameRound}`);
  let $modalButton = $('<div>').addClass('modal-button').attr('id', 'reset-button').text('Click Here to Start New Game');

  $modalBody.append($modalTitle, $modalContent, $modalButton);
  $modal.append($modalBody);
  $('.my-body').append($modal);
}

const updateStats = () => {
  console.log('updating stats...');
  updateMatch();
  updateAttempts();
  updateAccuracy();
  updateGameRound();
}

const updateMatch = () => {
  $('#current-match').text(currentMatch);
}

const updateAttempts = () => {
  $('#number-of-attempts').text(numberOfAttempts)
}

const updateAccuracy = () => {
  if(numberOfAttempts===0){
    $('#accuracy').text('0%');
  } else {
    accuracy = (currentMatch/numberOfAttempts * 100).toFixed(1);
    $('#accuracy').text(accuracy+'%');
  }
}
const updateGameRound = () => {
  $('#game-round').text(gameRound);
}

const checkCardsMatch = () => {
  console.log("checking match");
  if (clickedCards[0] === clickedCards[1]){
    currentMatch++;
  }
  numberOfAttempts++;
}
