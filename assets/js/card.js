class Card {
  constructor(frontUrl){
    this.url = frontUrl;
    this.clicked = false;
    this.front = null;
    this.back = 'url("../assets/images/super-mario-bros-logo.png")';
  }
  render() {
    let $card = $('<div>').addClass('card');
    let $front = $('<div>').addClass('front');
    let $back = $('<div>', {
      class : 'back',
      css : {
        'background-image': this.back,
        'background-size': "100% 100%"
      }
    });
    $card.append($front, $back);
    $('#game-board').append($card);
  }
}
