let carMakes = ["audi", "bmw", "mercedes", "lamborghini", "ferarri", "jeep", "kia"];
let pressedKey, blanks;
let attempts = 7;
let pressedKeyList = [];

function selectCarMake() {
  return carMakes[Math.floor(Math.random() * carMakes.length)];
}

function determinedSpaces(carMake) {
  var wordSpaces = "_";
  var spacesCount = carMake.length;
  return wordSpaces.repeat(spacesCount);
}

function addLetter(letter, guessedKey) {
  blanks = blanks.split("");
  blanks[letter] = guessedKey;
  blanks = blanks.join("");
  guessWord.textContent = blanks;
}

function checkIfWon() {
  if (!blanks.includes("_")) {
    attempts = 0;
    console.log('you have won');
    return true
  } else {
    return false

  }
}

function addAttempt(pressedKey) {
  var attemptsLeft = document.getElementById('attempts-left');
  var incorrectLetter = document.getElementById('letters-used');

  attempts--

  if (attempts >= 0) {
  attemptsLeft.textContent = attempts;

  pressedKeyList.push(pressedKey);
  incorrectLetter.textContent = pressedKeyList.join("");
  }

  if (attempts == 0) {
    console.log('you lost');
  }

  
}

var selectedCarMake = selectCarMake();
blanks = determinedSpaces(selectedCarMake);

// displays to UI blank spaces
var guessWord = document.getElementById('guess-word');
guessWord.textContent = blanks;


// determine user input
document.onkeyup = function (event) {
  pressedKey = event.key;
  // keystroke is 1 start game


  // keystroke is 2 restart or reset game
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    if (selectedCarMake.includes(pressedKey) && attempts > 0 && !checkIfWon()){

      for (var letter = 0; letter < selectedCarMake.length; letter++) {
        if (pressedKey == selectedCarMake[letter]) {
          addLetter(letter, pressedKey);
          checkIfWon();
        }
      }

    } else {
      addAttempt(pressedKey);
    }
  }
  
}









// var para = document.createElement("p");
// var node = document.createTextNode("This is new.");
// para.appendChild(node);
// var element = document.getElementById("div1");
// element.appendChild(para);