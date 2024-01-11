import "./styles.scss";

let playingField = document.querySelectorAll(".field");

function moveObject(add, sub) {
	return {
		addend: add,
		ofboard: sub,
	};
}

let moves = new Map();

// Set map for each move as key
moves.set("up", moveObject(-16, 240));
moves.set("right", moveObject(1, -16));
moves.set("down", moveObject(16, -240));
moves.set("left", moveObject(-1, 16));

let direction = "rigth";

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

// let interval = setInterval(moveSnake, 500);

function moveSnake() {
	snake.unshift(snake[0] + moves.get(direction).addend);
	removeSnakeTail(snake.pop());
	displaySnake();
}

window.addEventListener("keydown", (e) => {
	let key = e.key;

	switch (key) {
		case "ArrowUp":
			direction = "up";
			break;
		case "ArrowRight":
			direction = "right";
			break;
		case "ArrowDown":
			direction = "down";
			break;
		case "ArrowLeft":
			direction = "left";
			break;
	}
});
