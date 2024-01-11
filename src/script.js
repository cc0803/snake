import "./styles.scss";

let playingField = document.querySelectorAll(".field");

let direction;

let foodField;

let snake = [24, 8, 7, 6, 5];

function displaySnake() {
	snake.forEach((element) => {
		playingField[element].classList.add("green");
	});
}

function removeSnakeTail(field) {
	playingField[field].classList.remove("green");
}

displaySnake();

// let interval = setInterval(moveSnake, 1000);

function moveSnake() {
	snake.unshift(snake[0] + 16);
	console.log(snake);
	removeSnakeTail(snake.pop());
	displaySnake();
}
