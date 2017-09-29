import { SNAKE_LENGTH } from '../constants';

/**
 * Class represents Snake component
 */
export default class Snake {
  /**
   * Create new Snake
   *
   * @param {Object} props - The initial properties
   * @param {Number} props.snakeBodyPartsLength - The length of snake body parts by default
   */
  constructor(props) {
    this._snakeBodyParts = [];
    this._snakeBodyPartsLength = props.snakeBodyPartsLength || SNAKE_LENGTH;
  }

  /**
   * Push coordinates to snake body parts
   *
   * @returns {void}
   */
  createSnake() {
    this.setSnakeBodyParts([]);

    for (let i = this._snakeBodyPartsLength - 1; i >= 0; i--) {
      this._snakeBodyParts.push({ x: i, y: 0 });
    }
  }

  /**
   * Get snake body parts
   *
   * @returns {Array<{x: Number, y: Number}>} snakeBodyParts - The array of coordinates snake body
   */
  getSnakeBodyParts() {
    return this._snakeBodyParts;
  }

  /**
   * Set snake body parts
   *
   * @param {Array<{x: Number, y: Number}>} snakeBodyParts - The array of coordinates snake body
   *
   * @returns {void}
   */
  setSnakeBodyParts(snakeBodyParts) {
    this._snakeBodyParts = snakeBodyParts;
  }

  /**
   * Get snake head
   *
   * @returns {Object} - The snake head coordinates
   */
  getSnakeHead() {
    const [snakeHead] = this.getSnakeBodyParts();
    return snakeHead;
  }
}