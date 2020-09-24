/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,
  roundScore,
  activePlayer,
  dice1,
  dice2,
  gameplaying,
  prevDice,
  winningScore;

init();

document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gameplaying) {
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    //console.log(dice);
    const diceDom1 = document.querySelector(".dice-1");
    const diceDom2 = document.querySelector(".dice-2");

    diceDom1.style.display = "block";
    diceDom2.style.display = "block";
    diceDom1.src = "dice-" + dice1 + ".png";
    diceDom2.src = "dice-" + dice2 + ".png";

    //Challenge 3

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += (dice1 + dice2);
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }

    //Challenge 1-2
    // if (dice === 6 && prevDice === 6) {
    //   scores[activePlayer] = 0;
    //   document.getElementById(`score-${activePlayer}`).textContent =
    //     scores[activePlayer];
    //   nextPlayer();
    // } else if (dice !== 1) {
    //   roundScore += dice;
    //   document.getElementById(
    //     "current-" + activePlayer
    //   ).textContent = roundScore;
    // } else {
    //   nextPlayer();
    // }
    // prevDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gameplaying) {
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];
    var input = document.querySelector(".winning-score").value;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    if (scores[activePlayer] >= winningScore) {
      gameOver();
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

const gameOver = () => {
  document.querySelector("#name-" + activePlayer).textContent = "Winner!";
  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("winner");
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  gameplaying = false;
};

const nextPlayer = () => {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
};

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameplaying = true;
  prevDice = 0;
  dice1 = 0;
  dice2 = 0;

  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
