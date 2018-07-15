import React, {Component} from 'react';
import Field from './Field';
import ShowDateTime from './ShowDataTime';

class SnakeProcessor extends Component {

    constructor(props) {
        super(props);
        let width = 8, height = 9;

        let fillBoard = (height, width) => {
            let board = [], sumOfKeys = -2;
            for (let i = 0; i < height; i++) {
                sumOfKeys = i ? sumOfKeys : ++sumOfKeys;
                var row = [];
                for (let j = 0; j < width; j++) {
                    sumOfKeys++;
                    let cell = {
                        snake: 0,
                        apple: 0,
                        idX: i,
                        idY: j,
                        key: sumOfKeys
                    };
                    row.push(cell);
                }
                board.push(row);
            }

            return board;
        };

        this.state = {
            boardWidth: width,
            boardHeight: height,
            board: fillBoard(height, width),
            snakeY: 0,
            snakeX: 0,
            snakeDirection: 'u',
            previousSnakeDirection: 'u',
            snakeLength: 3,
            numberOfSteps: 0,
        };
    }

    componentDidMount() {
        this.startGame();
        this.getSnakeDirection();

        setInterval(this.nextStep, 500);

    }

    getSnakeDirection = () => {
        window.addEventListener('keydown', e => {
            let previousSnakeDirection = this.state.previousSnakeDirection;
            let snakeDirection;
            switch (e.key) {
                case 'ArrowUp':
                case 'KeyW':
                    snakeDirection = (previousSnakeDirection !== 'd') ? 'u' : 'd';
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    snakeDirection = (previousSnakeDirection !== 'u') ? 'd' : 'u';
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    snakeDirection = (previousSnakeDirection !== 'r') ? 'l' : 'r';
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    snakeDirection = (previousSnakeDirection !== 'l') ? 'r' : 'l';
                    break;
                default:
                    console.log('This is happened!');
                    snakeDirection = this.state.snakeDirection;
            }
            previousSnakeDirection = snakeDirection;
            this.setState({
                snakeDirection,
                previousSnakeDirection
            });
        });
    };

    nextStep = () => {
        let {snakeLength, board, snakeY: oldSnakeY, snakeX: oldSnakeX, numberOfSteps} = this.state,
            {snakeX, snakeY} = this.moveSnake(oldSnakeY, oldSnakeX);

        if (this.didItEatApple(board, snakeX, snakeY)) {
            board = this.eatApple(board, snakeX, snakeY)
            snakeLength++;
            this.tickleASnake(board, 0);
        } else
            this.tickleASnake(board);

        if (this.didItEatItself(board, snakeX, snakeY)) {
            this.startGame();
        } else {
            numberOfSteps++;
            board[snakeY][snakeX].snake = snakeLength;
            this.setState({
                snakeY,
                snakeX,
                snakeLength,
                board,
                numberOfSteps,
            });
        }
    };

    moveSnake = (snakeY, snakeX) => {
        let {snakeDirection, boardWidth: width, boardHeight: height} = this.state;
        switch (snakeDirection) {
            case 'u':
                snakeY = (snakeY < 1) ? height - 1 : snakeY - 1;
                break;
            case 'd':
                snakeY = (snakeY + 1 >= height) ? 0 : snakeY + 1;
                break;
            case 'l':
                snakeX = (snakeX < 1) ? width - 1 : snakeX - 1;
                break;
            case 'r':
                snakeX = (snakeX + 1 >= width) ? 0 : snakeX + 1;
                break;
            default:
                console.log('This is happened!');
        }
        return {snakeX, snakeY}
    }

    tickleASnake = (board, grab = 1) => {
        const {boardWidth: width, boardHeight: height} = this.state;
        for (var y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x) {
                var cell = board[y][x];

                if (cell.snake > 0) {
                    cell.snake -= grab;
                }
            }
        }

        return board;
    };

    didItEatItself = (board, snakeX, snakeY) => {

        return (board[snakeY][snakeX].snake > 0);
    };

    didItEatApple = (board, snakeX, snakeY) => {
        return (board[snakeY][snakeX].apple)
    };

    eatApple = (board, snakeX, snakeY) => {
        board[snakeY][snakeX].apple = 0;
        board = this.placeApple(board);
        return board;
    };

    startGame = () => {
        let board = this.reFillBoard();
        const {boardWidth: width, boardHeight: height} = this.state;

        let snakeX = Math.floor(width / 2),
            snakeY = Math.floor(height / 2),
            snakeLength = 3;

        board[snakeY][snakeX].snake = snakeLength;
        board = this.placeApple(board);

        this.setState({board, snakeY, snakeX, snakeDirection: 'u', numberOfSteps: 0, snakeLength});
    };

    placeApple = (board) => {
        let newAppleX,
            newAppleY;

        // A random coordinate for the apple
        do {
            newAppleX = Math.floor(Math.random() * this.state.boardWidth);
            newAppleY = Math.floor(Math.random() * this.state.boardHeight);
        } while (board[newAppleY][newAppleX].snake);

        board[newAppleY][newAppleX].apple = 1;

        return board;
    };

    reFillBoard = () => {
        const {boardHeight: height, boardWidth: width, board} = this.state;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                board[i][j].snake = 0;
                board[i][j].apple = 0;
            }
        }
        return board;
    };

    render() {
        return (
            <div>
                <ShowDateTime/>
                <Field
                    score={this.state.snakeLength - 3}
                    board={this.state.board}
                    size={{
                        boardWidth: this.state.boardWidth,
                        boardHeight: this.state.boardHeight
                    }}
                />
            </div>
        );
    };
};


export default SnakeProcessor;