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
			moveSnake(playingField);
		}, 400);
		startButton.textContent = "Stop";
		game = true;
	} else {
		startButton.textContent = "Start";
		clearInterval(interval);
		game = false;
	}
});
