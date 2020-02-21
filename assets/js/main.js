$(document).ready(initializeApp);
const numberOfPicture = 9;
const maxMatch = 9;
const marioCharacters = [
  'banzai-bill.png',
  'blooper.png',
  'bob-omb.png',
  'boo.png',
  'bowser.png',
  'bullet-bill.png',
  'buzzy-beetle.png',
  'chain-chomp.png',
  'cheep-cheep.png',
  'deep-cheep.png',
  'fire-piranha-plant.png',
  'goomba-mario.png',
  'goomba.png',
  'kamek.png',
  'king-boo.png',
  'koopa-troopa-green.png',
  'koopa-troopa-red.png',
  'luigi.png',
  'mario.png',
  'peach.png',
  'piranha-plant.png',
  'porcupuffer.png',
  'rosalina.png',
  'shy-guy.png',
  'spiny.png',
  'toad.png',
  'toadette.png'
];

let gameRound = 0;
let currentMatch = 0;
let numberOfAttempts = 0;
let accuracy = 0;
let clickedCards = [];


function initializeApp() {
  addClickHandler();
  newGame();
}

const addClickHandler = () => {
  $('.body').on('click', '#reset-button', newGame);
  $('#game-board').on('click', '.card', handleClick);
}

const newGame = () => {
  let $gameBoard = $('#game-board');
  $gameBoard.empty();
  gameRound++;
  currentMatch = 0;
  numberOfAttempts = 0;
  accuracy = 0;
  clickedCards = [];

  hideModal();

  createCards();
  updateStats();
}

const handleClick = (event) => {
  let $clickedCard = $(event.currentTarget);
  $clickedCard.addClass('disable-click');
  $clickedCard.find('.back').addClass('hidden');

  clickedCards.push($clickedCard);
  if (clickedCards.length === 2){
    checkCardsMatch();
  }
  updateStats();
  if (currentMatch === maxMatch) {
    showModal();
  }
}

const hideModal = () => {
  $('.modal').remove();
}

const showModal = () => {
  let $modal = $('<div>').addClass('modal');
  let $modalBody = $('<div>').addClass('modal-body');
  let $modalTitle = $('<div>').addClass('modal-title').text('You are the winner!');
  let $modalContent = $('<div>').addClass('modal-content').text(`You won Game Round ${gameRound}`);
  let $modalButton = $('<div>').addClass('modal-button').attr('id', 'reset-button').text('Click Here to Start New Game');

  $modalBody.append($modalTitle, $modalContent, $modalButton);
  $modal.append($modalBody);
  $('.body').append($modal);
}

const updateStats = () => {
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
  let $gameBoard = $('#game-board');
  let $firstCard = $(clickedCards[0]);
  let $secondCard = $(clickedCards[1]);
  if ($firstCard.find('.front').css('background-image') === $secondCard.find('.front').css('background-image')){
    $firstCard.addClass('disable-click');
    $secondCard.addClass('disable-click');
    currentMatch++;
  } else {
    $gameBoard.addClass('disable-click');
    setTimeout(()=>{
      $gameBoard.removeClass('disable-click');
      $firstCard.removeClass('disable-click');
      $secondCard.removeClass('disable-click');
      $firstCard.find('.back').removeClass('hidden');
      $secondCard.find('.back').removeClass('hidden');
    }, 2500)
  }
  clickedCards = [];
  numberOfAttempts++;
}

const pickRandomCards = howMany => {
  let randomCards = [];
  while (randomCards.length < howMany) {
    let randomNum = Math.floor(Math.random() * marioCharacters.length);
    let selected = marioCharacters[randomNum]
    if (!randomCards.includes(selected)) {
      randomCards.push(selected);
    }
  }
  return randomCards;
}

const shuffleCards = arrayOfCards => {
  let copied = arrayOfCards.concat(arrayOfCards);
  let shuffledCards = [];
  while (copied.length>0) {
    let randomNum = Math.floor(Math.random() * copied.length);
    shuffledCards.push(...copied.splice(randomNum, 1));
  }
  return shuffledCards;
}

const createCards = () => {
  let randomPictures = pickRandomCards(numberOfPicture);
  let shuffledCards = shuffleCards(randomPictures);

  for (let index = 0; index < shuffledCards.length; index++) {
    let card = new Card(shuffledCards[index]);
    card.render();
  }
}
