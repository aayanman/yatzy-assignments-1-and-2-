import express from "express";
import cors from "cors";
import YatzyGame from "./YatzyGame.js";

const app = express();
app.use(cors());
app.use(express.json());

let game = new YatzyGame();

app.get("/state", (req, res) => {
    res.json(game.getState());
});

app.post("/roll", (req, res) => {
    game.roll();
    res.json(game.getState());
});

app.post("/hold/:i", (req, res) => {
    game.toggleHold(parseInt(req.params.i));
    res.json(game.getState());
});

app.post("/score/:cat", (req, res) => {
    game.score(req.params.cat);
    res.json(game.getState());
});

app.post("/new", (req, res) => {
    game = new YatzyGame();
    res.json(game.getState());
});

app.listen(3000, () => console.log("Server running on port 3000"));