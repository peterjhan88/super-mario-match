class Card {
  constructor(frontUrl) {
    this.front = frontUrl;
    this.back = 'url("./assets/images/bowser-face.jpg")';
  }

  render = () => {
    let $card = $('<div>').addClass('card');
    let $front = $('<div>').addClass('front');
    let $back = $('<div>', {
      class : 'back',
      css : {
        'background-image': this.back,
      }
    });
    $card.append($front, $back);
    $('#game-board').append($card);
  }
}
