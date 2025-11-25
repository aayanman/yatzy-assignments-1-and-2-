export default class YatzyEngine {
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

        const has = seq => seq.every(n => counts[n]);

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
        if(!(category in this.scoreTable) || this.scoreTable[category] !== null) return false;
        this.scoreTable[category] = value;
        return true;
    }

    total(){
        return Object.values(this.scoreTable).reduce((s,v)=>s+(v||0),0);
    }
}