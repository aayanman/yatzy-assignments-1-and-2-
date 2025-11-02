class Dice {
    constructor(numDice = 5) {
        this.numDice = numDice;
        this.values = Array(numDice).fill(1);
        this.held = Array(numDice).fill(false);
    }
    roll() {
        this.values = this.values.map((v,i)=>this.held[i]?v:Math.floor(Math.random()*6)+1);
        return this.values;
    }
    toggleHold(i){if(i>=0&&i<this.numDice)this.held[i]=!this.held[i];}
    reset(){
        this.values = Array.from({length:this.numDice},()=>Math.floor(Math.random()*6)+1);
        this.held.fill(false);
    }
}

class YatzyEngine {
    constructor(){
        this.scoreTable={
            ones:null, twos:null, threes:null, fours:null, fives:null, sixes:null,
            threeOfAKind:null, fourOfAKind:null, fullHouse:null,
            smallStraight:null, largeStraight:null, yatzy:null, chance:null
        };
    }
    calculateScore(category,diceValues){
        const counts={}, sum=diceValues.reduce((a,b)=>a+b,0);
        diceValues.forEach(v=>counts[v]=(counts[v]||0)+1);
        const has=seq=>seq.every(n=>counts[n]);
        switch(category){
            case'ones':return(counts[1]||0)*1;
            case'twos':return(counts[2]||0)*2;
            case'threes':return(counts[3]||0)*3;
            case'fours':return(counts[4]||0)*4;
            case'fives':return(counts[5]||0)*5;
            case'sixes':return(counts[6]||0)*6;
            case'threeOfAKind':return Object.values(counts).some(c=>c>=3)?sum:0;
            case'fourOfAKind':return Object.values(counts).some(c=>c>=4)?sum:0;
            case'fullHouse':return Object.values(counts).includes(3)&&Object.values(counts).includes(2)?25:0;
            case'smallStraight':return has([1,2,3,4])||has([2,3,4,5])||has([3,4,5,6])?30:0;
            case'largeStraight':return has([1,2,3,4,5])||has([2,3,4,5,6])?40:0;
            case'yatzy':return Object.values(counts).includes(5)?50:0;
            case'chance':return sum;
            default:return 0;
        }
    }
    record(category,value){
        if(!(category in this.scoreTable)||this.scoreTable[category]!==null)return false;
        this.scoreTable[category]=value;return true;
    }
    total(){return Object.values(this.scoreTable).reduce((s,v)=>s+(v||0),0);}
}

class YatzyGame {
    constructor(){
        this.currentRound=1;this.numRounds=13;this.rollsLeft=3;
        this.dice=new Dice(5);this.engine=new YatzyEngine();
    }
    startNewGame(){
        this.currentRound=1;this.rollsLeft=3;
        this.dice.reset();this.engine=new YatzyEngine();
        updateUI();
    }
    rollDice(){
        if(this.rollsLeft<=0)return;
        this.dice.roll();this.rollsLeft--;
        updateUI();
    }
    score(category){
        const vals=this.dice.values,points=this.engine.calculateScore(category,vals);
        if(this.engine.record(category,points)){this.endTurn();updateUI();}
        else alert("Category already used!");
    }
    endTurn(){
        this.currentRound++;this.rollsLeft=3;this.dice.held.fill(false);
        if(this.currentRound>this.numRounds)this.endGame();
    }
    endGame(){
        alert(`Game Over! Total score: ${this.engine.total()}`);
        this.startNewGame();
    }
}

const game=new YatzyGame();
const diceArea=document.getElementById('diceArea');
const rollBtn=document.getElementById('rollBtn');
const newBtn=document.getElementById('newBtn');
const roundInfo=document.getElementById('roundInfo');
const rollInfo=document.getElementById('rollInfo');
const scoreBody=document.getElementById('scoreBody');
const totalScore=document.getElementById('totalScore');

const categories=Object.keys(game.engine.scoreTable);
categories.forEach(cat=>{
    const row=document.createElement('tr');
    const pretty=cat.replace(/([A-Z])/g,' $1');
    row.innerHTML=`<td>${pretty}</td><td class="val">—</td><td><button class="btn btn--tiny">Use</button></td>`;
    const btn=row.querySelector('button');
    btn.addEventListener('click',()=>game.score(cat));
    scoreBody.appendChild(row);
});

function renderDice(){
    diceArea.innerHTML='';
    const faces=['⚀','⚁','⚂','⚃','⚄','⚅'];
    game.dice.values.forEach((v,i)=>{
        const d=document.createElement('div');
        d.className='die'+(game.dice.held[i]?' held':'');
        d.textContent=faces[v-1];
        d.addEventListener('click',()=>{game.dice.toggleHold(i);renderDice();});
        diceArea.appendChild(d);
    });
}

function updateUI(){
    renderDice();
    roundInfo.textContent=`Round: ${game.currentRound} / 13`;
    rollInfo.textContent=`Rolls left: ${game.rollsLeft}`;
    totalScore.textContent=game.engine.total();
    const values=Object.values(game.engine.scoreTable);
    [...scoreBody.children].forEach((row,i)=>{
        const val=values[i];
        const cell=row.querySelector('.val');
        const btn=row.querySelector('button');
        if(val===null){cell.textContent='—';btn.disabled=false;btn.style.opacity='1';}
        else{cell.textContent=val;btn.disabled=true;btn.style.opacity='0.5';}
    });
}

rollBtn.addEventListener('click',()=>game.rollDice());
newBtn.addEventListener('click',()=>game.startNewGame());
game.startNewGame();