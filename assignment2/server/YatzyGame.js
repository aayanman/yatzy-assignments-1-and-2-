import Dice from "./Dice.js";
import YatzyEngine from "./YatzyEngine.js";

export default class YatzyGame {
    constructor(){
        this.currentRound = 1;
        this.numRounds = 13;
        this.rollsLeft = 3;
        this.dice = new Dice();
        this.engine = new YatzyEngine();
    }

    newGame() {
        this.currentRound = 1;
        this.rollsLeft = 3;
        this.dice.reset();
        this.engine = new YatzyEngine();
    }

    roll() {
        if (this.rollsLeft <= 0) return this.dice.values;
        this.dice.roll();
        this.rollsLeft--;
        return this.dice.values;
    }

    toggleHold(i) {
        this.dice.toggleHold(i);
    }

    score(category) {
        const points = this.engine.calculateScore(category, this.dice.values);
        const ok = this.engine.record(category, points);

        if (ok) {
            this.currentRound++;
            this.rollsLeft = 3;
            this.dice.held.fill(false);
        }

        return ok ? points : null;
    }

    getState() {
        return {
            round: this.currentRound,
            rollsLeft: this.rollsLeft,
            dice: this.dice.values,
            held: this.dice.held,
            scores: this.engine.scoreTable,
            total: this.engine.total()
        };
    }
}