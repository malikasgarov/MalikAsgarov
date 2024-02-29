const board = document.getElementById('game-board');
        let snake = [{ x: 0, y: 0 }];
        let direction = 'right';
        let food = generateFood();

        function generateFood() {
            let foodPosition;
            do {
                const x = Math.floor(Math.random() * 15) * 13;
                const y = Math.floor(Math.random() * 15) * 13;
                const overlap = snake.some(segment => segment.x === x && segment.y === y);
                if (!overlap) {
                    foodPosition = { x, y };
                }
            } while (!foodPosition);
            return foodPosition;
        }


        function draw() {
            board.innerHTML = '';
            snake.forEach(segment => {
                const snakeSegment = document.createElement('div');
                snakeSegment.className = 'snake';
                snakeSegment.style.left = `${segment.x}px`;
                snakeSegment.style.top = `${segment.y}px`;
                board.appendChild(snakeSegment);
            });

            const foodElement = document.createElement('div');
            foodElement.className = 'food';
            foodElement.style.left = `${food.x}px`;
            foodElement.style.top = `${food.y}px`;
            board.appendChild(foodElement);
        }

        function update() {
            const head = { ...snake[0] };
            switch (direction) {
                case 'up':
                    head.y -= 13;
                    break;
                case 'down':
                    head.y += 13;
                    break;
                case 'left':
                    head.x -= 13;
                    break;
                case 'right':
                    head.x += 13;
                    break;
            }

            snake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
                food = generateFood();
            } else {
                snake.pop();
            }
            if (head.x < 0 || head.x >= 291 || head.y < 0 || head.y >= 291) {
                alert('Game Over!');
                resetGame();
            }


            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    alert('Game Over!');
                    resetGame();
                }
            }
            canChangeDirection = true;
            draw();
        }

        function resetGame() {
            snake = [{ x: 0, y: 0 }];
            direction = 'right';
            food = generateFood();
        }
        let canChangeDirection = true;

        function changeDirection(newDirection) {
            if (canChangeDirection) {
                if (
                    (newDirection === 'up' && direction !== 'down') ||
                    (newDirection === 'down' && direction !== 'up') ||
                    (newDirection === 'left' && direction !== 'right') ||
                    (newDirection === 'right' && direction !== 'left')
                ) {
                    direction = newDirection;
                    canChangeDirection = false;
                }
            }
        }


        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'ArrowUp':
                    changeDirection('up');
                    break;
                case 'ArrowDown':
                    changeDirection('down');
                    break;
                case 'ArrowLeft':
                    changeDirection('left');
                    break;
                case 'ArrowRight':
                    changeDirection('right');
                    break;
                case "w":
                    changeDirection('up');
                    break;
                case "s":
                    changeDirection('down');
                    break;
                case "a":
                    changeDirection('left');
                    break;
                case "d":
                    changeDirection('right');
                    break;
            }
        });

        setInterval(update, 125);