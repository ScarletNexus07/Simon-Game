$(function () {
  var randomColors = ["green", "red", "yellow", "blue"];
  var gamePattern = [];
  var userChosenColour = [];
  var started = false;
  var level = 0;

  $(document).keypress(function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  //for randomly genetating buttons
  function nextSequence() {
    userChosenColour = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    gamePattern.push(randomColors[randomNumber]);
    $("#" + randomColors[randomNumber])
      .fadeToggle(50)
      .fadeToggle(50);
    playSound(randomColors[randomNumber]);
  }

  // for clicking by user

  $(".btn").click(function () {
    var color = $(this).attr("id");
    playSound(color);
    animateButton(color);
    userChosenColour.push(color);
    checkSequence(userChosenColour.length - 1);
  });

  //for checking the pushed button

  function checkSequence(gameLevel) {
    if (userChosenColour[gameLevel] === gamePattern[gameLevel]) {
      if (userChosenColour.length === gamePattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }

  function playSound(name) {
    var song = new Audio("sounds/" + name + ".mp3");
    song.play();
  }
  function animateButton(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function () {
      $("#" + name).removeClass("pressed");
    }, 100);
  }
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
});
