/**
 * Class represents GameLoop component
 */
export default class GameLoop {
  /**
   * Create new GameLoop
   *
   */
  constructor() {
    this.gameLoop = null;
  }

  /**
   * Get game loop
   *
   * @returns {Number} - Returns game loop function
   */
  getGameLoop() {
    return this.gameLoop;
  }

  /**
   * Set game loop function
   *
   * @param {Number} gameLoop - Game loop function
   *
   * @returns {Number} - Returns game loop function
   */
  setGameLoop(gameLoop) {
    this.gameLoop = gameLoop;
  }
}
