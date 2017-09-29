import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  KEY_DOWN,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_UP,
  TIME_INTERVAL
} from '../constants';
import Direction from './direction';
import Draw from './draw';
import Food from './food';
import GameLoop from './gameLoop';
import Score from './score';
import Snake from './snake';


/**
 * Class represents Game component
 */
export default class Game {
  /**
   * Create new Game
   *
   * @param {Object} props - The initial properties
   * @param {String} props.canvasId - The id of canvas tag where game will be mounted
   * @param {String} props.cellFillStyle - The hex for fill cell style
   * @param {String} props.cellStrokeStyle - The hex for fill stroke style
   * @param {Number} props.cellWidth - The basic cell width
   * @param {Number} props.snakeBodyPartsLength - The length of snake body parts by default
   * @param {Number} props.timeInterval - The default time interval for game loop
   */
  constructor(props) {
    const {
      canvasId,
      cellFillStyle,
      cellStrokeStyle,
      cellWidth,
      snakeBodyPartsLength,
      timeInterval
    } = props;

    this._timeInterval = props.timeInterval || TIME_INTERVAL;
    this._direction = new Direction(props);
    this._draw = new Draw({ canvasId, cellFillStyle, cellStrokeStyle, cellWidth, timeInterval });
    this._food = new Food(props);
    this._gameLoop = new GameLoop(props);
    this._score = new Score(props);
    this._snake = new Snake({ snakeBodyPartsLength });

    this._drawGame = this._drawGame.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);

    this._subscribeOnKeyDown();
  }

  /**
   * Add event listener on key down event
   *
   * @returns {void}
   */
  _subscribeOnKeyDown() {
    document.addEventListener('keydown', this._keyDownHandler, false);
  }

  /**
   * The handler on key down event action
   * @param {Object} e - The event object
   *
   * @returns {void}
   */
  _keyDownHandler(e) {
    const direction = this._direction.getDirection();
    const key = e.keyCode;

    if (key === KEY_LEFT && direction !== DIRECTION_RIGHT) {
      this._direction.setDirection(DIRECTION_LEFT);
    } else if (key === KEY_UP && direction !== DIRECTION_DOWN) {
      this._direction.setDirection(DIRECTION_UP);
    } else if (key === KEY_RIGHT && direction !== DIRECTION_LEFT) {
      this._direction.setDirection(DIRECTION_RIGHT);
    } else if (key === KEY_DOWN && direction !== DIRECTION_UP) {
      this._direction.setDirection(DIRECTION_DOWN);
    }
  }

  /**
   * init the js
   *
   * @returns {void}
   */
  init() {
    const gameLoop = this._gameLoop.getGameLoop();

    this._direction.setDirection(DIRECTION_RIGHT);
    this._snake.createSnake();
    this._food.setFoodBound(this._generateRandomBound());
    this._score.setScoreCount(0);

    if (typeof gameLoop !== 'undefined') clearInterval(gameLoop);

    this._gameLoop.setGameLoop(setInterval(this._drawGame, this._timeInterval));
  }

  /**
   * Draw elements of the js
   *
   * @returns {void}
   */
  _drawGame() {
    const canvas = this._draw.getCanvas();
    const ctx = this._draw.getCtx();
    const direction = this._direction.getDirection();
    let { x, y } = this._snake.getSnakeHead();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (direction === DIRECTION_RIGHT) x++;
    else if (direction === DIRECTION_LEFT) x--;
    else if (direction === DIRECTION_UP) y--;
    else if (direction === DIRECTION_DOWN) y++;

    if (
      this._checkCollisionByX(x) ||
      this._checkCollisionByY(y) ||
      this._checkCollisionByTail(x, y)
    ) {
      this.init();
    } else {
      if (this._checkCollisionByFood(x, y)) {
        this._food.setFoodBound(this._generateRandomBound());
        this._score.setScoreCount(this._score.getScoreCount() + 1);
      } else {
        const getSnakeBodyParts = this._snake.getSnakeBodyParts();
        this._snake.setSnakeBodyParts(getSnakeBodyParts.slice(0, getSnakeBodyParts.length - 1));
      }

      this._snake.setSnakeBodyParts([{ x, y }, ...this._snake.getSnakeBodyParts()]);
      this._draw.drawSnake(this._snake.getSnakeBodyParts());
      this._draw.drawFood(this._food.getFoodBound());
      this._draw.drawScore(this._score.getScoreCount());
    }
  }

  /**
   * Check moment when snake touch the axis
   * @param {Number} x - The axis coord of snake head
   *
   * @returns {Boolean} - If snake touched the axis
   */
  _checkCollisionByX(x) {
    const canvas = this._draw.getCanvas();
    const options = this._draw.getOptions();

    return x === -1 || x === canvas.width / options.cellWidth;
  }

  /**
   * Check moment when snake touch the ordinate
   * @param {Number} y - The ordinate coord of snake head
   *
   * @returns {Boolean} - If snake touched the ordinate
   */
  _checkCollisionByY(y) {
    const canvas = this._draw.getCanvas();
    const options = this._draw.getOptions();

    return y === -1 || y === canvas.height / options.cellWidth;
  }

  /**
   * Check moment when snake touch its tail
   * @param {Number} x - The axis coordinate of snake head
   * @param {Number} y - The ordinate coord of snake head
   *
   * @returns {Boolean} - If snake touched the food
   */
  _checkCollisionByTail(x, y) {
    const array = this._snake.getSnakeBodyParts();

    for (let i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y) return true;
    }

    return false;
  }

  /**
   * Check moment when snake touch the food
   * @param {Number} x - The axis coord of snake head
   * @param {Number} y - The ordinate coord of snake head
   *
   * @returns {Boolean} - If snake touched the food
   */
  _checkCollisionByFood(x, y) {
    const foodBound = this._food.getFoodBound();

    return x === foodBound.x && y === foodBound.y;
  }

  /**
   * Generate the object that contains random axis and ordinate coordinates
   *
   * @returns {Object} - The object that contains random coordinates
   */
  _generateRandomBound() {
    const canvas = this._draw.getCanvas();
    const options = this._draw.getOptions();

    return {
      x: Math.round((Math.random() * (canvas.width - options.cellWidth)) / options.cellWidth),
      y: Math.round((Math.random() * (canvas.height - options.cellWidth)) / options.cellWidth)
    };
  }
}
