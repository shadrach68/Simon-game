const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let gameStarted = false;
let level = 0;

$(document).keydown(function () {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
    $("#level-title").html("Level " + level);
  }
});

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      // console.log("success: user completed the sequence");
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    // console.log("wrong");
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  const randomNumber = Math.floor(Math.random() * buttonColors.length);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeIn(100);
  playSound(randomChosenColor);

  $("#level-title").html("level " + level);
}

// function flashElement() {
//   $("#" + gamePattern[0])
//     .fadeOut(50)
//     .fadeIn(2000, flashElement);
// }

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

// nextSequence();
// flashElement();

// console.log(gamePattern.length);
