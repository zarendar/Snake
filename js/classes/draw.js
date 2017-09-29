import {
  COLOR_BLUE,
  COLOR_WHITE,
  CELL_POSITION,
  CELL_WIDTH
} from '../constants';

/**
 * Class represents Draw component
 */
export default class Draw {
  /**
   * Create new Draw
   *
   * @param {Object} props - The initial properties
   * @param {String} props.canvasId - The id of canvas tag where game will be mounted
   * @param {String} props.cellFillStyle - The hex for fill cell style
   * @param {String} props.cellStrokeStyle - The hex for fill stroke style
   * @param {Number} props.cellWidth - The basic cell width
   */
  constructor(props) {
    const canvas = document.getElementById(props.canvasId);

    this._canvas = canvas;
    this._cellFillStyle = props.cellFillStyle || COLOR_BLUE;
    this._cellStrokeStyle = props.cellStrokeStyle || COLOR_WHITE;
    this._cellWidth = props.cellWidth || CELL_WIDTH;
    this._ctx = canvas.getContext('2d');
  }

  /**
   * Get canvas element
   *
   * @returns {Object} - Returns canvas element
   */
  getCanvas() {
    return this._canvas;
  }

  /**
   * Get canvas context
   *
   * @returns {Object} - Returns canvas context
   */
  getCtx() {
    return this._ctx;
  }

  /**
   * Get draw options
   *
   * @returns {Object} - Returns draw options
   */
  getOptions() {
    return {
      cellWidth: this._cellWidth
    };
  }

  /**
   * Draw the food on the canvas
   *
   * @param {Object} foodBound - The bound of food coordinates
   *
   * @returns {void}
   */
  drawFood(foodBound) {
    this._drawCell(foodBound.x, foodBound.y);
  }

  /**
   * Draw the score on the canvas
   *
   * @param {Number} scoreCount - The score count
   *
   * @returns {void}
   */
  drawScore(scoreCount) {
    const scoreText = `Score: ${scoreCount}`;

    this._ctx.beginPath();
    this._ctx.fillText(scoreText, CELL_POSITION, this._canvas.height - CELL_POSITION);
    this._ctx.closePath();
  }

  /**
   * Draw the snake on the canvas
   *
   * @param {Array<{x: Number, y: Number}>} snakeBodyParts - The array of coordinates snake body
   *
   * @returns {void}
   */
  drawSnake(snakeBodyParts) {
    for (let i = 0; i < snakeBodyParts.length; i++) {
      const currentCell = snakeBodyParts[i];
      this._drawCell(currentCell.x, currentCell.y);
    }
  }

  /**
   * Draw the cell
   *
   * @param {Number} x - The axis coordinate of the cell
   * @param {Number} y - The ordinate coordinate of the cell
   *
   * @returns {void}
   */
  _drawCell(x, y) {
    this._ctx.beginPath();
    this._ctx.fillStyle = this._cellFillStyle;
    this._ctx.fillRect(x * this._cellWidth, y * this._cellWidth, this._cellWidth, this._cellWidth);
    this._ctx.strokeStyle = this._cellStrokeStyle;
    this._ctx.strokeRect(
      x * this._cellWidth,
      y * this._cellWidth,
      this._cellWidth,
      this._cellWidth
    );
    this._ctx.closePath();
  }
}
