// Initialize variables
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let snake = [{ x: 10, y: 10 }];
let direction = "right";
let food = {};
let score = 0;

// Generate random food location
function generateFood() {
  food = {
    x: Math.floor(Math.random() * 39) * 10,
    y: Math.floor(Math.random() * 39) * 10,
  };
}

// Draw the snake and food on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "green";
  snake.forEach(function (segment) {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);

  // Draw the score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

// Move the snake
function moveSnake() {
  // Determine the new head position
  let head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "right":
      head.x += 10;
      break;
    case "left":
      head.x -= 10;
      break;
    case "up":
      head.y -= 10;
      break;
    case "down":
      head.y += 10;
      break;
  }

  // Add the new head to the beginning of the snake array
  snake.unshift(head);

  // Check if the snake has collided with the wall or itself
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake.some(function (segment, index) {
      return index > 0 && segment.x === head.x && segment.y === head.y;
    })
  ) {
    // Game over
    clearInterval(interval);
    alert("Game over! Your score is " + score);
  } else if (head.x === food.x && head.y === food.y) {
    // The snake has eaten the food
    score++;
    generateFood();
  } else {
    // Remove the tail segment
    snake.pop();
  }
}

// Start the game
generateFood();
let interval = setInterval(function () {
  moveSnake();
  draw();
}, 100);

// Listen for keyboard input to change the direction of the snake
document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 37:
      direction = "left";
      break;
    case 38:
      direction = "up";
      break;
    case 39:
      direction = "right";
      break;
    case 40:
      direction = "down";
      break;
  }
});
