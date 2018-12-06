let pressedKey, blanks, guessWord, selectedCarMake, incorrectLetter, attemptsLeft, welcome, lettersUsedTitle;
let attempts = 5;
let losses = 0;
let wins = 0;
let pressedKeyList = [];

function selectCarMake() {
  var carMakes = [
    {
      "make": "audi",
      "image": "assets/images/audi.gif"
    },
    {
      "make": "bmw",
      "image": "assets/images/bmw.png"
    },
    {
      "make": "mercedes",
      "image": "assets/images/mercedes.gif"
    },
    {
      "make": "lexus",
      "image": "assets/images/lexus.gif"
    },
    {
      "make": "acura",
      "image": "assets/images/acura.gif"
    },
    {
      "make": "ferrari",
      "image": "assets/images/Ferrari.jpg"
    },
    {
      "make": "lamborghini",
      "image": "assets/images/lamborghini.jpg"
    }
  ]
  return carMakes[Math.floor(Math.random() * carMakes.length)];
}

function determinedSpaces(carMake) {
  var wordSpaces = "_";
  var spacesCount = carMake.length;
  return wordSpaces.repeat(spacesCount);
}

function checkIfWon() {
  if (!blanks.includes("_")) {
    return true
  } else {
    return false
  }
}

function addToLoss() {
  losses++
  var lossNumber = document.getElementById('losses');
  lossNumber.textContent = "Losses: " + losses;
  var audio = new Audio('assets/sounds/lose.mp3');
  audio.play();
}

function addToWin() {
  wins++
  var winNumber = document.getElementById('wins');
  winNumber.textContent = "Wins: " + wins;
  var audio = new Audio('assets/sounds/win.mp3');
  audio.play();
}

function resetGuessedLetters() {
  pressedKeyList = [];
  incorrectLetter.textContent = pressedKeyList;
}

function resetAttempts() {
  attempts = 5;
  attemptsLeft.textContent = "Attempts Remaining: " + attempts;
}

function displayWinBrand() {
  var winLogo = document.getElementById("last-win");

  if (!document.getElementById('last-win-img')) {
    var pTag = document.createElement("p");
    var imgTag = document.createElement("img");
    
    pTag.textContent = "Last Win: ";
    pTag.id = "last-win-p";
    imgTag.id = "last-win-img"
    imgTag.src = selectedCarMake.image;

    winLogo.appendChild(pTag);
    winLogo.appendChild(imgTag);  

  } else {
    var imgTag = document.getElementById("last-win-img");
    imgTag.src = selectedCarMake.image;
  }
}

function addLetter(letter, guessedKey) {
  blanks = blanks.split("");
  blanks[letter] = guessedKey;
  blanks = blanks.join("");
  guessWord.textContent = blanks;

  if(checkIfWon()) {
    addToWin();
    displayWinBrand();
    resetGuessedLetters();
    resetAttempts();
    startGame();    
  }
}

function addAttempt(pressedKey) {
  if (attempts >= 0) {
    if (!pressedKeyList.includes(pressedKey)) {
      var audio = new Audio('assets/sounds/wrong-letter.mp3');
      audio.play();

      attempts--
      pressedKeyList.push(pressedKey);
      incorrectLetter.textContent = pressedKeyList.join("");
      attemptsLeft.textContent = "Attempts Remaining: " + attempts;
    }
  }

  if (attempts == 0) {
    addToLoss();
    resetGuessedLetters();
    resetAttempts();
    startGame();
  }
}

function displayGame() {
  attempts = 5;

  selectedCarMake = selectCarMake();
  blanks = determinedSpaces(selectedCarMake.make);

  lettersUsedTitle = document.getElementById('letters-used-title');
  incorrectLetter = document.getElementById('letters-used');
  guessWord = document.getElementById('guess-word');
  attemptsLeft = document.getElementById('attempts-left');
  var question = document.getElementById('question');

  guessWord.textContent = blanks;
  attemptsLeft.textContent = "Attempts Remaining: " + attempts;
  question.textContent = "Can you guess the car brand?"
  lettersUsedTitle.textContent = "Letters Tried: "
}

function userGuess(guess) {
  if (guess.keyCode >= 65 && guess.keyCode <= 90) {
    if(selectedCarMake.make.includes(guess.key)) {

      for (var letter = 0; letter < selectedCarMake.make.length; letter++) {
        if (guess.key == selectedCarMake.make[letter]) {
          addLetter(letter, guess.key);
        } 
      }

    } else {
      addAttempt(guess.key);
    }

  } else {
    // tell user to only use alphabet characters
  }
}

function startGame() {
  displayGame();

  document.onkeyup = function (keyPress) {
    userGuess(keyPress);
  }
}

welcome = document.getElementById('welcome');
welcome.textContent = "Press Any Key To Begin Playing";

document.onkeyup = function (event) {
  pressedKey = event.key;
  if (pressedKey){
    var audio = new Audio('assets/sounds/start-game.mp3');
    audio.play();

    welcome.textContent = "";
    startGame();
  }
}