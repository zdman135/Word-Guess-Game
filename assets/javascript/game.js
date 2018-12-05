let pressedKey, blanks, guessWord, selectedCarMake, incorrectLetter, attemptsLeft, welcome;
let attempts = 5;
let losses = 0;
let wins = 0;
let pressedKeyList = [];

function selectCarMake() {
  var carMakes = ["audi", "bmw", "mercedes", "lexus", "acura", "ferrari", "lamborghini"];
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
}

function addToWin() {
  wins++
  var winNumber = document.getElementById('wins');
  winNumber.textContent = "Wins: " + wins;
}

function resetGuessedLetters() {
  pressedKeyList = [];
  incorrectLetter.textContent = pressedKeyList;
}

function resetAttempts() {
  attempts = 5;
  attemptsLeft.textContent = "Attempts Remaining: " + attempts;
}

function addLetter(letter, guessedKey) {
  blanks = blanks.split("");
  blanks[letter] = guessedKey;
  blanks = blanks.join("");
  guessWord.textContent = blanks;

  if(checkIfWon()) {
    addToWin();
    resetGuessedLetters();
    resetAttempts();
    displayBrand(blanks);
    startGame();    
  }
}

function addAttempt(pressedKey) {
  if (attempts >= 0) {
    if (!pressedKeyList.includes(pressedKey)) {
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
  blanks = determinedSpaces(selectedCarMake);

  incorrectLetter = document.getElementById('letters-used');
  guessWord = document.getElementById('guess-word');
  attemptsLeft = document.getElementById('attempts-left');
  
  guessWord.textContent = blanks;
  attemptsLeft.textContent = "Attempts Remaining: " + attempts;
}

function userGuess(guess) {
  if (guess.keyCode >= 65 && guess.keyCode <= 90) {
    if(selectedCarMake.includes(guess.key)) {

      for (var letter = 0; letter < selectedCarMake.length; letter++) {
        if (guess.key == selectedCarMake[letter]) {
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
    welcome.textContent = "";
    startGame();
  }
}