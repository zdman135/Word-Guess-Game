let nounChoice = ["person", "place", "thing"];
let randomNounChoice = nounChoice[Math.floor(Math.random() * nounChoice.length)];
let nounObject;

wordsList = {
    "person": ["Bruce Lee", "Jesus", "Albert Einstein", "Marilyn Monroe", "Bil Gates"],
    "place": ["Statue of Liberty", "Eiffel Tower", "Big Ben", "Leaning Tower of Pisa", "Empire State Building"],
    "thing": ["Table", "Chair", "Computer", "Water Bottle", "Paper"]
}

function selectWord() {
    let selectedWord = wordsList[randomNounChoice][Math.floor(Math.random() * wordsList[randomNounChoice].length)];
    return selectedWord
}

function showTheSpaces(selectedWord) {
    selectedWord = selectedWord.split(" ");
    let wordSpacesArray = [];

    selectedWord.forEach(function(word) {
        let wordSpaces = " _ ";
        let spacesCount = word.length;

        wordSpaces =  wordSpaces.repeat(spacesCount);
        console.log(wordSpaces);
        wordSpacesArray.push(wordSpaces);

    });
    return wordSpacesArray;
}

var mainGame = document.getElementById('main-game');
var newDiv = document.createElement('div');

newDiv.textContent =  selectWord();
mainGame.appendChild(newDiv);