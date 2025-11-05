# Yatzy Game — Assignment 1

## Objective
This project is a single-player Yatzy web game built using HTML, CSS, and JavaScript.  
It implements the official Yatzy rules, manages game state, and provides a functional and responsive user interface.

---

## Gameplay Overview
The player rolls five dice up to three times per round, holding any dice they wish to keep between rolls.  
At the end of each round, the player must select one available category to record a score.  
Each category can only be used once.  
After all 13 categories are used, the total score is calculated, and the game ends.

---

## Game Flow
1. Click **Roll Dice** to roll up to three times per round.
2. Click a die to hold or unhold it before rolling again.
3. Click **Use** next to a category to record that round’s score.
4. After all 13 rounds, the game displays the total score.
5. Click **New Game** to reset the dice, scorecard, and start again.

---

## Scoring Categories
| Category | Description | Points |
|-----------|--------------|--------|
| Ones – Sixes | Sum of dice showing that number | Face × Count |
| Three of a Kind | At least 3 of the same value | Sum of all dice |
| Four of a Kind | At least 4 of the same value | Sum of all dice |
| Full House | 3 of one value and 2 of another | 25 |
| Small Straight | 4 consecutive values (1–4, 2–5, 3–6) | 30 |
| Large Straight | 5 consecutive values (1–5 or 2–6) | 40 |
| Yatzy | All dice identical | 50 |
| Chance | Sum of all dice | Sum total |

---

## Design and Layout
- Dark color palette with green accent for interaction
- Two-column layout: left (dice and controls) and right (scorecard)
- Responsive grid for mobile and desktop
- Hover states highlight interactive elements in green 