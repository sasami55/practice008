var scores , activeScore , dice , activePlayer , rollDice , changePlayer , init , gamePlaying , hideDice , selectCurrentScore;

init();

function rollDice() {
  dice = Math.floor(Math.random() * 6 + 1);
};

function hideDice() {
  document.querySelector('.img-dice').style.display = 'none';
} 

selectCurrentScore = document.querySelector('#current-' + activePlayer + '-score');

function init() {
  gamePlaying = true;
  scores = [0 , 0];
  activeScore = 0;
  activePlayer = 0;
  
  document.querySelector('#player-0-tag').textContent = 'player 1';
  document.querySelector('#player-1-tag').textContent = 'player 2';

  document.querySelector('#display-0').classList.remove('active');
  document.querySelector('#display-1').classList.remove('active');
  document.querySelector('#display-0').classList.add('active');

  document.querySelector('#world-0-score').textContent = '0';
  document.querySelector('#world-1-score').textContent = '0';

  document.querySelector('#current-0-score').textContent = activeScore;
  document.querySelector('#current-1-score').textContent = activeScore;

  hideDice()

  document.querySelector('#player-0-tag').style.color = 'black'
  document.querySelector('#player-1-tag').style.color = 'black'
  document.querySelector('#current-0-score').style.color = 'black'
  document.querySelector('#current-1-score').style.color = 'black'
};

function changePlayer() {
  activeScore = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('#display-0').classList.toggle('active');
  document.querySelector('#display-1').classList.toggle('active');
  document.querySelector('#current-' + activePlayer + '-score').style.color = 'black'
  hideDice()
};

// game start
document.querySelector('.game-start').addEventListener('click' , function() {
  document.querySelector('#wrapper-start').style.display = 'none';
  document.querySelector('#wrapper-game').style.display = 'flex';
});

// click Roll Dice
document.querySelector('.roll-dice').addEventListener('click' , function () {
  if (gamePlaying) {
    // 1 display dice
    rollDice();
    document.querySelector('.img-dice').src = './resources/img/dice-' + dice + '.png';
    document.querySelector('.img-dice').style.display = 'block';
  
    // 2 add current score if not 1
    if (dice !== 1){
      activeScore += dice;
      document.querySelector('#current-' + activePlayer + '-score').textContent = activeScore;
    } else {
      document.querySelector('#current-' + activePlayer + '-score').textContent = 'Bomb!!';
      document.querySelector('#current-' + activePlayer + '-score').style.color = '#f5623f'
      
      // change player
      changePlayer();
      document.querySelector('#current-' + activePlayer + '-score').textContent = '0';
    }
  }
})

// click Keep
document.querySelector('.keep-point').addEventListener('click' , function () {
  if (gamePlaying) {
    // 1 add activeScore to players global scores
    scores[activePlayer] += activeScore;

    // 2 change UI
    document.querySelector('#world-' + activePlayer + '-score').textContent = scores[activePlayer];

    // 3 change player if not goal
    if (scores[activePlayer] >= 30 ){
      document.querySelector('#player-' + activePlayer + '-tag').textContent = 'winner!!';
      document.querySelector('#player-' + activePlayer + '-tag').style.color = '#f5623f'
      hideDice()
      gamePlaying = false;
    } else {
      changePlayer();
      document.querySelector('#current-' + activePlayer + '-score').textContent = '0';
    }
  }
})

// click New Game
document.querySelector('.new-game').addEventListener('click' , init);


