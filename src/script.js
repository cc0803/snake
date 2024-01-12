import "./styles.scss";
import {
	keyboardControls,
	spawnRedField,
	moveSnake,
	displaySnake,
} from "./gameMechanics";

let playingField = document.querySelectorAll(".field");

// Handel keyboard controls
window.addEventListener("keydown", (e) => {
	keyboardControls(e);
});

displaySnake(playingField);
spawnRedField(playingField);

// let interval = setInterval(function () {
// 	moveSnake(playingField);
// }, 500);
