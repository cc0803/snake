// Create Map to record posibble moves
let moves = new Map();

let direction = "right";

let snake = [1, 0];

let score = snake.length - 2;

let highscore = 0;

const highscoreBoard = document.querySelector(".highscore");
const scoreBoard = document.querySelector(".score:last-of-type");
const startButton = document.querySelector(".start");

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
		score++;
		updateScore();
		return true;
	}
	return false;
}

export function moveSnake(gameField, intervalFunction) {
	let move = nextMove(snake[0] + moves.get(direction).addend);

	if (checkMove(move)) {
		stopEverything(intervalFunction, gameField);
	}

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

function checkMove(move) {
	return snake.includes(move + snake[0]);
}

function updateScore() {
	if (score >= highscore) {
		highscore = score;
		highscoreBoard.textContent = highscore;
	}
	scoreBoard.textContent = score;
}

function resetBoard(gameField) {
	gameField.forEach((field) => {
		field.classList.remove("green");
		field.classList.remove("red");
	});
	gameField[0].classList.add("green");
	gameField[1].classList.add("green");
}

export function stopEverything(intervalFunction, gameField, gameSatus) {
	clearInterval(intervalFunction);
	snake = [1, 0];
	resetBoard(gameField);
	score = 0;
	updateScore();

	if (gameSatus) {
		startButton.textContent = "Start";
		return false;
	} else {
		startButton.textContent = "Stop";
		return true;
	}
}
