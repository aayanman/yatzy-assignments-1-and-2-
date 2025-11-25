export default class Dice {
    constructor(numDice = 5) {
        this.numDice = numDice;
        this.values = Array(numDice).fill(1);
        this.held = Array(numDice).fill(false);
    }
    roll() {
        this.values = this.values.map((v,i)=> this.held[i] ? v : Math.floor(Math.random()*6)+1);
        return this.values;
    }
    toggleHold(i) {
        this.held[i] = !this.held[i];
    }
    reset() {
        this.values = Array.from({length:this.numDice},()=>Math.floor(Math.random()*6)+1);
        this.held.fill(false);
    }
}