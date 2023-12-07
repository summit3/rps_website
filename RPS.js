let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function pickCompMove() {
  let move = "";

  const randnum = Math.random();
  if (randnum >= 0 && randnum <= 1 / 3) {
    move = "rock";
  } else if (randnum > 1 / 3 && randnum <= 2 / 3) {
    move = "paper";
  } else if (randnum > 2 / 3 && randnum <= 1) {
    move = "scissors";
  }
  return move;
}
function makeDecision(userChoice) {
  let move = pickCompMove();
  let result = "";

  if (userChoice === "rock") {
    if (move === "rock") {
      result = "You tied.";
    } else if (move === "paper") {
      result = "You lose.";
    } else if (move === "scissors") {
      result = "You win.";
    }
  } else if (userChoice === "paper") {
    if (move === "paper") {
      result = "You tied.";
    } else if (move === "scissors") {
      result = "You lose.";
    } else if (move === "rock") {
      result = "You win.";
    }
  } else if (userChoice === "scissors") {
    if (move === "scissors") {
      result = "You tied.";
    } else if (move === "rock") {
      result = "You lose.";
    } else if (move === "paper") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "You tied.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector(".score").innerHTML = `
Wins:${score.wins}
Losses:${score.losses}
Ties:${score.ties}`;

  document.querySelector(".result").innerHTML = result;
  document.querySelector(".choice").innerHTML = `You
<img src="${userChoice}-emoji.png" /><img src="${move}-emoji.png" />Computer`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  document.querySelector(".score").innerHTML = `
Wins:${score.wins}
Losses:${score.losses}
Ties:${score.ties}`;

  return score;
}

document.querySelector(".js-rock").addEventListener("click", function() {
  makeDecision("rock")
})

document.querySelector(".js-paper").addEventListener("click", function() {
  makeDecision("paper")
})

document.querySelector(".js-scissors").addEventListener("click", function() {
  makeDecision("scissors")
})

document.querySelector(".js-reset").addEventListener("click", function() {
  resetScore()
})

document.body.addEventListener("keydown", function(event) {
  if (event.key === "r") {
    makeDecision("rock");
  } else if (event.key === "p") {
    makeDecision("paper");
  } else if (event.key === "s") {
    makeDecision("scissors");
  }
})