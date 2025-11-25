const API = "http://localhost:3000";

const diceArea = document.getElementById('diceArea');
const rollBtn = document.getElementById('rollBtn');
const newBtn = document.getElementById('newBtn');
const roundInfo = document.getElementById('roundInfo');
const rollInfo = document.getElementById('rollInfo');
const scoreBody = document.getElementById('scoreBody');
const totalScore = document.getElementById('totalScore');

let categories = [
    "ones","twos","threes","fours","fives","sixes",
    "threeOfAKind","fourOfAKind","fullHouse",
    "smallStraight","largeStraight","yatzy","chance"
];

// Build the scorecard table (static rows)
function initScoreRows() {
    scoreBody.innerHTML = "";
    categories.forEach(cat => {
        const pretty = cat.replace(/([A-Z])/g, " $1");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pretty}</td>
            <td class="val">—</td>
            <td><button class="btn btn--tiny">Use</button></td>
        `;
        const btn = row.querySelector("button");
        btn.addEventListener("click", () => useScore(cat));
        scoreBody.appendChild(row);
    });
}

// API calls -----------------------------
async function fetchState() {
    const r = await fetch(`${API}/state`);
    return r.json();
}

async function roll() {
    const r = await fetch(`${API}/roll`, { method: "POST" });
    update(await r.json());
}

async function holdDie(i) {
    const r = await fetch(`${API}/hold/${i}`, { method: "POST" });
    update(await r.json());
}

async function useScore(cat) {
    const r = await fetch(`${API}/score/${cat}`, { method: "POST" });
    update(await r.json());
}

async function newGame() {
    const r = await fetch(`${API}/new`, { method: "POST" });
    update(await r.json());
}

// Rendering ------------------------------
function renderDice(dice, held, rollsLeft) {
    diceArea.innerHTML = "";
    const faces = ['⚀','⚁','⚂','⚃','⚄','⚅'];

    dice.forEach((v, i) => {
        const d = document.createElement("div");
        d.className = "die" + (held[i] ? " held" : "");
        d.textContent = faces[v - 1];

        d.addEventListener("click", () => {
            if (rollsLeft < 3) holdDie(i);
        });

        diceArea.appendChild(d);
    });
}

function update(data) {
    // top info
    roundInfo.textContent = `Round: ${data.round} / 13`;
    rollInfo.textContent = `Rolls left: ${data.rollsLeft}`;
    totalScore.textContent = data.total;

    // dice
    renderDice(data.dice, data.held, data.rollsLeft);

    // score table
    const vals = Object.values(data.scores);
    [...scoreBody.children].forEach((row, i) => {
        const cell = row.querySelector(".val");
        const btn = row.querySelector("button");

        const v = vals[i];

        if (v === null) {
            cell.textContent = "—";
            btn.disabled = (data.rollsLeft === 3);
        } else {
            cell.textContent = v;
            btn.disabled = true;
        }
    });
}

// Init app -----------------------------
async function start() {
    initScoreRows();
    update(await fetchState());
}

rollBtn.addEventListener("click", roll);
newBtn.addEventListener("click", newGame);

start();