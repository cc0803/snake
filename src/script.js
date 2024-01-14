import "./styles.scss";
import {
	keyboardControls,
	spawnRedField,
	moveSnake,
	displaySnake,
} from "./gameMechanics";

const playingField = document.querySelectorAll(".field");
const startButton = document.querySelector(".start");

let game = false;
let interval;

// Handel keyboard controls
window.addEventListener("keydown", (e) => {
	keyboardControls(e);
});

displaySnake(playingField);
spawnRedField(playingField);

startButton.addEventListener("click", () => {
	if (!game) {
		interval = setInterval(function () {
			moveSnake(playingField, interval);
		}, 400);
		startButton.textContent = "Stop";
		game = true;
	} else {
		stopEverything(interval, playingField, game);
	}
});

function stopEverything(intervalFunction, gameField) {
	if (game) {
		game = false;
	} else {
		game = true;
	}

	clearInterval(intervalFunction);
	snake = [1, 0];
	resetBoard(gameField);
	score = 0;
	updateScore();
	startButton.textContent = "Start";
}
