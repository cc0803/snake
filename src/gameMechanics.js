// Create Map to record posibble moves
let moves = new Map();

let direction = "right";

let snake = [1, 2];

let redField;

// Create object for moves map
function movesObject(add, sub) {
	return {
		addend: add,
		offboard: sub,
	};
}

// Set map for each move as key
moves.set("up", movesObject(-16, 240));
moves.set("right", movesObject(1, -15));
moves.set("down", movesObject(16, -240));
moves.set("left", movesObject(-1, 15));

//----------------------------------------

export function keyboardControls(e) {
	switch (e.key) {
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
}

function nextMove(move) {
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

export function spawnRedField(gameField) {
	let randomField;

	// Create random number
	do {
		randomField = Math.floor(Math.random() * 256);

		// Check if random number is part of snake
	} while (snake.includes(randomField));

	// Change color of field with random number
	gameField[randomField].classList.add("red");

	redField = randomField;
}

function removeRedField(gameField) {
	gameField[redField].classList.remove("red");
}

export function displaySnake(gameField) {
	snake.forEach((element) => {
		gameField[element].classList.add("green");
	});
}

function removeSnakeTail(gameField, field) {
	gameField[field].classList.remove("green");
}

function checkForRedField(field) {
	if (field == redField) {
		return true;
	}
	return false;
}

export function moveSnake(gameField) {
	let move = nextMove(snake[0] + moves.get(direction).addend);

	// Check if Snake is on redField
	if (checkForRedField(snake[0] + move)) {
		removeRedField(gameField);
		spawnRedField(gameField);
	} else {
		removeSnakeTail(gameField, snake.pop());
	}
	snake.unshift(snake[0] + move);
	displaySnake(gameField);
}
