const SYMBOLS = ["Circle", "Square", "Cross", "Star", "Waves"];
const COLORS = ["Black", "Red", "Blue", "Green", "Yellow"];

const cardContainer = document.getElementById('card-container');
const cardFlipper = document.getElementById('card-flipper');
const cardBackFace = document.getElementById('card-back-face');
const cardFrontFace = document.getElementById('card-front-face');
const cardPlaceholderText = document.getElementById('card-placeholder-text');

const drawButton = document.getElementById('draw-card-btn');

const symbolGuessGroup = document.getElementById('symbol-guess-group');
const colorGuessGroup = document.getElementById('color-guess-group');

const checkGuessButton = document.getElementById('check-guess-btn');
const guessMessage = document.getElementById('guess-message');
const scoreDisplay = document.getElementById('score-display');
const cardsLeftDisplay = document.getElementById('cards-left-display');

const modeSymbolColorRadio = document.getElementById('mode-symbol-color');
const modeSymbolOnlyRadio = document.getElementById('mode-symbol-only');
const gameModeRadios = document.querySelectorAll('input[name="gameMode"]');

const resultsModal = document.getElementById('results-modal');
const finalResultsMessage = document.getElementById('final-results-message');
const closeButton = document.getElementsByClassName('close-button')[0];
const startNewRoundModalBtn = document.getElementById('start-new-round-modal-btn');

const aboutTestLink = document.getElementById('about-test-link');
const aboutModal = document.getElementById('about-modal');
const aboutCloseButton = document.getElementById('about-close-button');

const cardBackSelection = document.querySelector('.card-back-selection');
const colorBoxes = document.querySelectorAll('.color-box');

let currentDeck = [];
let cardToGuess = null;
let score = 0;
let totalGuesses = 0; 
let currentGameMode = 'symbol-only';
let deckFinishedState = false;
let currentRotation = 0;
let firstCardDrawn = false;
let selectedCardBack = 'Blue';

function setGameModeInputsDisabled(isDisabled) {
    gameModeRadios.forEach(radio => {
        if (isDisabled) {
            
            if (radio.value !== currentGameMode) {
                radio.disabled = true;
            }
        } else {
            
            radio.disabled = false;
        }
    });
}

function setGuessInputsDisabled(isDisabled) {
    const symbolRadios = document.querySelectorAll('input[name="guessSymbol"]');
    symbolRadios.forEach(radio => {
        radio.disabled = isDisabled;
    });

    const colorRadios = document.querySelectorAll('input[name="guessColor"]');
    colorRadios.forEach(radio => {
        radio.disabled = isDisabled;
    });

    checkGuessButton.disabled = isDisabled;
}

function showPlaceholder() {
    cardFlipper.style.display = 'none';
    cardPlaceholderText.style.display = 'block';
    currentRotation = 0;
    cardFlipper.style.transform = `rotateY(${currentRotation}deg)`;
    setGuessInputsDisabled(true);

    cardFlipper.style.opacity = '0';
    cardFlipper.style.transform = `translateY(-50px) rotateY(${currentRotation}deg)`;
    cardFlipper.classList.remove('first-card-drop-in');
}

function showCardBack() {
    cardPlaceholderText.style.display = 'none';
    cardFlipper.style.display = 'block';

    if (firstCardDrawn && cardFlipper.classList.contains('first-card-drop-in')) {
        cardFlipper.style.opacity = '1';
        cardFlipper.style.transform = `translateY(0) rotateY(${currentRotation}deg)`;
    }

    if (Math.abs(currentRotation % 360) === 180) {
        currentRotation += 180;
    } else if (currentRotation % 360 !== 0) {

        currentRotation = Math.round(currentRotation / 180) * 180;
        if (Math.abs(currentRotation % 360) === 180) {
            currentRotation += 180;
        }
    }
    cardFlipper.style.transform = `rotateY(${currentRotation}deg)`;

    setGuessInputsDisabled(false);
    drawButton.disabled = true;
}

function showRevealedCard(card) {
    cardPlaceholderText.style.display = 'none';
    cardFlipper.style.display = 'block';
    cardFrontFace.src = `images/${card.symbol}-${card.color}.png`;
    cardFrontFace.alt = `${card.color} ${card.symbol}`;

    currentRotation += 180;
    cardFlipper.style.transform = `rotateY(${currentRotation}deg)`;

    setGuessInputsDisabled(true);
    drawButton.disabled = true;

    if (currentDeck.length === 0) {

        setTimeout(() => {
            drawButton.textContent = "See Test Results";
            drawButton.classList.add('results-button');
            drawButton.disabled = false;
            deckFinishedState = true;
        }, 600);
    } else {

        setTimeout(() => {
            drawButton.disabled = false;
        }, 600);
    }
}

function generateSymbolColorDeck() {
    const generatedDeck = [];
    for (const symbol of SYMBOLS) {
        for (const color of COLORS) {
            generatedDeck.push({ symbol: symbol, color: color });
        }
    }
    return generatedDeck;
}

function generateSymbolOnlyDeck() {
    const generatedDeck = [];
    for (const symbol of SYMBOLS) {
        
        for (let i = 0; i < 5; i++) {
            generatedDeck.push({ symbol: symbol, color: "Black" }); 
        }
    }
    return generatedDeck;
}

function initGameForNewMode() {
    if (currentGameMode === 'symbol-color') {
        currentDeck = generateSymbolColorDeck();
        colorGuessGroup.style.display = 'flex';
    } else {
        currentDeck = generateSymbolOnlyDeck();
        colorGuessGroup.style.display = 'none';
    }
    shuffleArray(currentDeck);
    score = 0;
    totalGuesses = 0;
    updateScoreDisplay();
    updateCardsLeftDisplay();

    showPlaceholder();
    cardToGuess = null;

    drawButton.textContent = "Start Test";
    drawButton.classList.remove('results-button');
    drawButton.disabled = false;

    deckFinishedState = false;
    guessMessage.textContent = "Please press 'Start Test' button!";
    guessMessage.style.color = "#666";

    const selectedSymbolRadio = document.querySelector('input[name="guessSymbol"]:checked');
    if (selectedSymbolRadio) selectedSymbolRadio.checked = false;
    const selectedColorRadio = document.querySelector('input[name="guessColor"]:checked');
    if (selectedColorRadio) selectedColorRadio.checked = false;

    setGuessInputsDisabled(true);
    firstCardDrawn = false;
    cardFlipper.style.opacity = '0';
    cardFlipper.style.transform = 'translateY(-50px) rotateY(0deg)';
    cardFlipper.classList.remove('first-card-drop-in');

    setGameModeInputsDisabled(false); 
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function drawRandomCard() {

    if (currentDeck.length === 0) {
        displayFinalResults();
        return;
    }

    updateGuessMessage();
    guessMessage.style.color = "#666";

    if (!firstCardDrawn) {
        cardFlipper.style.display = 'block';
        cardFlipper.classList.add('first-card-drop-in');
        cardFlipper.addEventListener('animationend', function handler() {
            cardFlipper.classList.remove('first-card-drop-in');
            cardFlipper.removeEventListener('animationend', handler);
        });
        firstCardDrawn = true;
        setGameModeInputsDisabled(true); 
    } else {
        cardFlipper.classList.remove('first-card-drop-in');
    }

    showCardBack();

    const selectedSymbolRadio = document.querySelector('input[name="guessSymbol"]:checked');
    if (selectedSymbolRadio) {
        selectedSymbolRadio.checked = false;
    }
    const selectedColorRadio = document.querySelector('input[name="guessColor"]:checked');
    if (selectedColorRadio) {
        selectedColorRadio.checked = false;
    }

    cardToGuess = currentDeck.shift();
    updateCardsLeftDisplay();
    setGuessInputsDisabled(false);
}

function handleDrawButtonClick() {
    if (drawButton.textContent === "Start Test") {

        drawButton.textContent = "Get New Card";
        drawRandomCard();
    } else if (drawButton.textContent === "Get New Card") {
        drawRandomCard();
    } else if (drawButton.textContent === "See Test Results") {
        displayFinalResults();
        setGameModeInputsDisabled(false); 
    } else if (drawButton.textContent === "Start New Round") {

        initGameForNewMode();
    }
}

function checkGuess() {
    const selectedSymbolRadio = document.querySelector('input[name="guessSymbol"]:checked');
    const userGuessSymbol = selectedSymbolRadio ? selectedSymbolRadio.value : '';

    const selectedColorRadio = document.querySelector('input[name="guessColor"]:checked');
    const userGuessColor = selectedColorRadio ? selectedColorRadio.value : '';

    if (!userGuessSymbol) {
        guessMessage.textContent = "Please select a symbol!";
        guessMessage.style.color = "orange";
        return;
    }

    if (currentGameMode === 'symbol-color' && !userGuessColor) {
        guessMessage.textContent = "Please select both a symbol and a color!";
        guessMessage.style.color = "orange";
        return;
    }

    if (!cardToGuess) {
        guessMessage.textContent = "Click 'Get New Card' first!";
        guessMessage.style.color = "orange";
        return;
    }

    totalGuesses++; 

    showRevealedCard(cardToGuess);

    let isCorrect = false;
    if (currentGameMode === 'symbol-color') {
        isCorrect = (userGuessSymbol === cardToGuess.symbol && userGuessColor === cardToGuess.color);
    } else {
        isCorrect = (userGuessSymbol === cardToGuess.symbol);
    }

    if (isCorrect) {
        guessMessage.textContent = "Congratulations! You guessed correctly!";
        guessMessage.style.color = "green";
        score++;
    } else {
        if (currentGameMode === 'symbol-only') {
            guessMessage.textContent = `Incorrect. The card was: ${cardToGuess.symbol}`;
        } else {
            guessMessage.textContent = `Incorrect. The card was: ${cardToGuess.color} ${cardToGuess.symbol}`;
        }
        guessMessage.style.color = "red";
    }
    updateScoreDisplay();
    setGuessInputsDisabled(true);
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score} / ${totalGuesses}`;
}

function updateCardsLeftDisplay() {
    cardsLeftDisplay.textContent = `Cards Left: ${currentDeck.length}`;
}

function updateGuessMessage() {
    if (currentGameMode === 'symbol-only') {
        guessMessage.textContent = "Guess the symbol of the next card!";
    } else {
        guessMessage.textContent = "Guess the symbol and color of the next card!";
    }
    guessMessage.style.color = "#666";
}

function displayFinalResults() {
    let message = "";
    
    let chancePerGuess;
    if (currentGameMode === 'symbol-color') {
        chancePerGuess = 1 / (SYMBOLS.length * COLORS.length); 
    } else { 
        chancePerGuess = 1 / SYMBOLS.length; 
    }

    
    const expectedChanceScore = totalGuesses * chancePerGuess;

    const percentageCorrect = (totalGuesses === 0) ? 0 : (score / totalGuesses) * 100;

    message += `Test complete! Your score: ${score} out of ${totalGuesses} (${percentageCorrect.toFixed(2)}%).\n\n`;

    if (totalGuesses === 0) {
        message += "You haven't made any guesses.";
    } else if (score > expectedChanceScore * 1.2) { 
        message += `Your score (${score}) is significantly above the chance level (${expectedChanceScore.toFixed(2)}). This might indicate developed intuition or ESP abilities.`;
    } else if (score < expectedChanceScore * 0.8) { 
        message += `Your score (${score}) is below the chance level (${expectedChanceScore.toFixed(2)}). This is perfectly normal, many people guess randomly.`;
    } else {
        message += `Your score (${score}) is close to the chance level (${expectedChanceScore.toFixed(2)}). This is typical for random guessing.`;
    }

    finalResultsMessage.textContent = message;
    resultsModal.classList.add('active');
    document.body.classList.add('modal-open');
    guessMessage.textContent = "";
}

closeButton.addEventListener('click', () => {
    resultsModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    if (deckFinishedState) {
        drawButton.textContent = "Start New Round";
        drawButton.classList.remove('results-button');
        drawButton.disabled = false;
    }
});

window.addEventListener('click', (event) => {
    if (event.target == resultsModal) {
        resultsModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        if (deckFinishedState) {
            drawButton.textContent = "Start New Round";
            drawButton.classList.remove('results-button');
            drawButton.disabled = false;
        }
    }
});

startNewRoundModalBtn.addEventListener('click', () => {
    resultsModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    initGameForNewMode();
    setGameModeInputsDisabled(false); 
});


modeSymbolColorRadio.addEventListener('change', () => {
    currentGameMode = 'symbol-color';
    initGameForNewMode();
});

modeSymbolOnlyRadio.addEventListener('change', () => {
    currentGameMode = 'symbol-only';
    initGameForNewMode();
});

aboutTestLink.addEventListener('click', (event) => {
    event.preventDefault();
    aboutModal.classList.add('active');
    document.body.classList.add('modal-open');
});

aboutCloseButton.addEventListener('click', () => {
    aboutModal.classList.remove('active');
    document.body.classList.remove('modal-open');
});

window.addEventListener('click', (event) => {
    if (event.target == aboutModal) {
        aboutModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
});

cardBackSelection.addEventListener('click', (event) => {
    
    if (document.body.classList.contains('modal-open')) {
        return;
    }

    const target = event.target;
    if (target.classList.contains('color-box')) {
        colorBoxes.forEach(box => box.classList.remove('active'));
        target.classList.add('active');
        selectedCardBack = target.dataset.color;
        cardBackFace.style.backgroundImage = `url('images/_Back-${selectedCardBack}.png')`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (modeSymbolOnlyRadio.checked) {
        currentGameMode = 'symbol-only';
    } else if (modeSymbolColorRadio.checked) {
        currentGameMode = 'symbol-color';
    }
    initGameForNewMode();
    cardContainer.classList.add('initial-fade-in');
    cardBackFace.style.backgroundImage = `url('images/_Back-${selectedCardBack}.png')`;
    setGameModeInputsDisabled(false); 
});

drawButton.addEventListener('click', handleDrawButtonClick);
checkGuessButton.addEventListener('click', checkGuess);