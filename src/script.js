import "./styles.scss";

let playingField = document.querySelectorAll(".field");

function moveObject(add, sub) {
	return {
		addend: add,
		offboard: sub,
	};
}

let moves = new Map();

// Set map for each move as key
moves.set("up", moveObject(-16, 240));
moves.set("right", moveObject(1, -15));
moves.set("down", moveObject(16, -240));
moves.set("left", moveObject(-1, 15));

let direction = "right";

let foodField;

let snake = [1, 2, 3, 4, 5];

function displaySnake() {
	snake.forEach((element) => {
		playingField[element].classList.add("green");
	});
}

function removeSnakeTail(field) {
	playingField[field].classList.remove("green");
}

displaySnake();

function moveSnake() {
	let nextMove = returnMove(snake[0] + moves.get(direction).addend);
	snake.unshift(snake[0] + nextMove);
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

function returnMove(move) {
	if (move < 0 || move > 256) {
		return moves.get(direction).offboard;
	} else if (!((move + 1) % 16) && direction == "left") {
		return moves.get(direction).offboard;
	} else if (!(move % 16) && direction == "right") {
		return moves.get(direction).offboard;
	} else {
		return moves.get(direction).addend;
	}
}

function spawnRedField() {
	let randomField;
	do {
		randomField = Math.floor(Math.random() * 256);
	} while (snake.includes(randomField));
	playingField[randomField];
}

// let interval = setInterval(moveSnake, 500);
