// Hide win and lose screens
$("#game-over").hide();
$("#winner").hide();

$(document).ready(function () {
  // creating array with every letter of the alphabet
  let alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  // creating an array of programming related words
  let words = [
    "Algorithm",
    "Program",
    "API",
    "Argument",
    "ASCII",
    "Boolean",
    "Bug",
    "Char",
    "Objects",
    "Class",
    "Code",
    "Compilation",
    "Conditionals",
    "Constants",
    "Array",
    "Declaration",
    "Exception",
    "Expression",
    "Framework",
    "Hardcode",
    "Loop",
    "Iteration",
    "Keywords",
    "Null",
    "Operand",
    "Operator",
    "Variable",
    "Pointer",
    "Package",
    "Runtime",
    "Backend",
    "Statement",
    "Syntax",
    "Token",
  ];

  // setting amount of lives
  let lives = 5;

  // getting random word from array words
  var randomWord = words[Math.floor(Math.random() * words.length)];
  let lettersCorrect = 0;

  // Hide game over nad win divs until Game is finished

  // handle game reload
  $(".play-again-btn").click(function () {
    location.reload();
  });

  // drawing alphabet squares
  alphabet.forEach((letter) => {
    $("#alphabet-row").append(
      `
      <button
      id="letter-square"
      class="btn border-none rounded-0 btn-light">
        ${letter}
      </button>
      `
    );
  });

  // drawing blank letter spaces
  for (var i = 0; i < randomWord.length; i++) {
    $("#hidden-word").append(`<div class="letter-space"></div>`);
  }

  drawLives(lives);

  // drawing lives to screen
  function drawLives(hearts) {
    // clear previous hearts
    $("#lives").empty();
    // for amount of lives left draw full hearts
    for (var i = 0; i < hearts; i++) {
      $("#lives").append(`
        <i class="fas fa-heart live"></i>
      `);
    }
    // (totalhearts(5) - livesremaining = draw remaining outline hearts)
    for (var i = hearts; i < 5; i++) {
      $("#lives").append(`
        <i class="far fa-heart live"></i>
      `);
    }
    // if no lives remain, GameOver
    if (lives === 0) {
      $("#game-over-word").text(randomWord);
      $("#game-over").fadeIn();
    }
  }

  // check if letter is in word and functionality
  function checkLetter(letter) {
    let letterFound = false;
    for (var i = 0; i < randomWord.length; i++) {
      if (letter === randomWord.toLowerCase().charAt(i)) {
        letterFound = true;
        lettersCorrect++;
        // if letter is the first one, capitalize it
        if (i === 0) {
          $(`.letter-space:eq( ${i} )`).text(letter.toUpperCase());
        } else {
          $(`.letter-space:eq( ${i} )`).text(letter);
        }
        // get rid of letter underline
        $(`.letter-space:eq( ${i} )`).css("border-bottom", "none");
      }
    }
    if (lettersCorrect === randomWord.length) {
      $("#winner").fadeIn();
    }
    // if letter not found in word take away a live and redraw hearts
    if (!letterFound) {
      lives = lives - 1;
      drawLives(lives);
    }
  }

  // On Click Letter Function
  $("#alphabet-row")
    .children()
    .click(function () {
      // disable button for future use and run check letter function
      $(this).addClass("disabled");
      checkLetter(this.innerText);
    });
});