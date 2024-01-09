import "./styles.scss";

let playingField = document.querySelectorAll(".field");

let direction;

let foodField;

let snake = [5, 6, 7, 8, 24];

snake.forEach((element) => {
	playingField[element].classList.add("green");
});
