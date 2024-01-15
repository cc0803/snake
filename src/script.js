import "./styles.scss";
import {
	keyboardControls,
	spawnRedField,
	moveSnake,
	displaySnake,
	stopEverything,
} from "./gameMechanics";

const playingField = document.querySelectorAll(".field");
const startButton = document.querySelector(".start");

let game = false;
let interval;

// Handel keyboard controls
window.addEventListener("keydown", (e) => {
	keyboardControls(e);
});

// setup the Game for the first time
displaySnake(playingField);
spawnRedField(playingField);

startButton.addEventListener("click", () => {
	if (!game) {
		spawnRedField(playingField);
		interval = setInterval(function () {
			moveSnake(playingField, interval);
		}, 400);
		startButton.textContent = "Stop";
		game = true;
	} else {
		game = stopEverything(interval, playingField, game);
	}
});
