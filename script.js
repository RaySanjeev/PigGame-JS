'use strict';

// DOM ELEMENTS
const newGameDOM = document.querySelector('.btn--new');
const btnHoldDOM = document.querySelector('.btn--hold');
const btnRollDOM = document.querySelector('.btn--roll');
const player1DOM = document.querySelector('.player--0');
const player2DOM = document.querySelector('.player--1');

const globalScore1DOM = document.getElementById('score--0');
const globalScore2DOM = document.getElementById('score--1');
const currScore1DOM = document.getElementById('current--0');
const currScore2DOM = document.getElementById('current--1');

const diceDOM = document.querySelector('.dice');

// GLOBAL VARIABLES
let randomNumber, scores, activePlayer, currentScore;
let playing = true;

function init() {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  diceDOM.classList.add('hidden');
  globalScore1DOM.textContent = 0;
  globalScore2DOM.textContent = 0;
  player1DOM.classList.remove('player--winner');
  player2DOM.classList.remove('player--winner');
  player1DOM.classList.add('player--active');
  player2DOM.classList.remove('player--active');
}

function switchPlayer() {
  // CURRENT SCORE TO 0
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // SWITCH PLAYER
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1DOM.classList.toggle('player--active');
  player2DOM.classList.toggle('player--active');
}

// INITIALISING THE GAME
init();

// DOM DELEGATIONS
btnRollDOM.addEventListener('click', () => {
  if (playing) {
    // GENERATE RANDOM NUMBER
    randomNumber = Math.trunc(Math.random() * 6) + 1;

    // SHOW NUMBER IN DICE IMAGE
    diceDOM.classList.remove('hidden');
    diceDOM.src = `images/dice-${randomNumber}.png`;

    // CHECK FOR 1
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // SWITCH PLAYER
      switchPlayer();
    }
  }
});

btnHoldDOM.addEventListener('click', () => {
  if (playing) {
    // ADD CURRENT SCORE TO GLOBAL SCORE
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // CHECK FOR 100
    if (scores[activePlayer] >= 20) {
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      playing = false;
      diceDOM.classList.add('hidden');
    }
    // SWITCH PLAYER
    switchPlayer();
  }
});

newGameDOM.addEventListener('click', () => {
  init();
});
