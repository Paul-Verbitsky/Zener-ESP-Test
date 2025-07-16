# Zener ESP Test

<p align="center">
  <img src="zener-esp-test.png" alt="Zener ESP Test">
</p>

This repository contains the code for an interactive web-based Zener ESP Test, designed to explore forms of extrasensory perception, specifically clairvoyance. Users attempt to identify the symbol and/or color of a hidden Zener card.

## Overview

The Zener ESP Test is a classic experiment used to investigate extrasensory perception (ESP). This web application provides a user-friendly platform to conduct such tests, allowing participants to guess hidden card attributes and compare their results against chance levels. It's a fun and engaging way to explore intuition and perception.

## Features

* **Classic (Symbols Only) Mode:** Test your intuition by guessing one of five unique Zener card symbols (Circle, Square, Cross, Star, Waves).
* **Hard (Symbols & Colors) Mode:** A more challenging mode where you must correctly identify both the symbol and one of five distinct colors (Black, Red, Blue, Green, Yellow) for each card.
* **Interactive Card Flipping:** Visually appealing animations for drawing and revealing cards.
* **Score Tracking:** Tracks your correct guesses against the total attempts.
* **Chance Level Comparison:** Provides immediate feedback on whether your score is above, below, or close to statistical chance levels.
* **Configurable Card Backs:** Choose from different card back colors (Blue, Red, Brown, Green).
* **Informative "About" Section:** Detailed explanations of the test modes, statistical significance (for entertainment purposes), and how to interpret results.
* **Responsive Design:** Optimized for various screen sizes.

## How It Works

The test generates a shuffled deck of Zener cards based on the selected game mode. When "Start Test" or "Get New Card" is clicked, a card is drawn from the deck and presented face down. The user then selects their guess (symbol only or symbol and color) and clicks "Check Guess." The card is revealed, and the guess is evaluated, updating the score and providing instant feedback. The game continues until all 25 cards are drawn, after which final results are displayed comparing the user's score to statistically expected chance levels.

## Technologies Used

* **HTML5:** For the page structure.
* **CSS3:** For styling and animations.
* **JavaScript:** For game logic, interactivity, and dynamic content updates.

## Getting Started

To run this project locally, simply clone the repository and open the `index.html` file in your web browser.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Paul-Verbitsky/Zener-ESP-Test.git](https://github.com/Paul-Verbitsky/Zener-ESP-Test.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd zener-esp-test
    ```
3.  **Open `index.html`:**
    Double-click `index.html` or open it with your preferred web browser.

## Usage

1.  **Select Test Mode:** Choose between "Classic (Symbols Only)" or "Hard (Symbols & Colors)" mode at the beginning of a round.
2.  **Choose Card Back (Optional):** Select your preferred card back color.
3.  **Start Test:** Click the "Start Test" button to draw the first card.
4.  **Make Your Guess:** Select your symbol (and color, if in Hard mode) using the radio buttons.
5.  **Check Guess:** Click "Check Guess" to reveal the card and see if you were correct.
6.  **Continue:** Click "Get New Card" to proceed with the next card until the deck is finished.
7.  **View Results:** After all cards are tested, click "See Test Results" to view your final score and analysis.
8.  **Learn More:** Click "About the Zener ESP Test" for detailed explanations of the test and scoring.

## About the Zener ESP Test

The Zener ESP test is a classic method developed by parapsychologists Karl Zener and J. B. Rhine in the 1930s. It's designed to test for forms of extrasensory perception (ESP), primarily clairvoyance (the ability to gain information about an object or event without using known senses).

### How the Test Works:

* A deck of 25 Zener cards is used. Each card has one of five distinct symbols: a circle, a square, a cross, a star, or three wavy lines.
* In the "Classic (Symbols Only)" mode, you guess the symbol on a card that is hidden from your view.
* In the "Hard (Symbols & Colors)" mode, each symbol also has one of five distinct colors (Black, Red, Blue, Green, Yellow), and you must guess both the symbol and the color.
* For each guess, the card is revealed, and your answer is compared to the actual card.

### Interpreting Your Score (for entertainment purposes):

In a standard 25-card Zener test where you guess one of five symbols, the expected number of correct guesses by pure chance is 5 (25 total cards / 5 symbols = 5 correct guesses).

#### In Classic (Symbols Only) Mode (25 cards):

* A score of **8 or more** correct guesses is statistically significant (meaning there's only about a 10.9% chance of getting it randomly).
* A score of **10 or more** correct guesses is considered highly significant (about 1.18% chance randomly).
* A score of **15 or more** is extremely rare by chance (roughly 1 in 73,700). Such a result would be highly unusual and warrants further investigation in a scientific context.

#### In Hard (Symbols & Colors) Mode (25 cards):

* Remember, the chance level here is 1 correct guess.
* A score of **3 or more** correct guesses would be considered very significant, as it's three times the expected random score.
* A score of **5 or more** would be extremely rare by chance in this more challenging mode.

It's crucial to understand that these thresholds are for illustrative purposes within the context of this test. For a more rigorous scientific assessment of ESP, experiments require very strict controls, a much larger number of trials, and complex statistical analysis.

## Contribution

Feel free to fork this repository and submit pull requests for any improvements or bug fixes.

## License

This project is licensed under the **GNU Lesser General Public License Version 3, 29 June 2007** - see the `LICENSE` file for details.