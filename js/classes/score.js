/**
 * Class represents Score component
 */
export default class Score {
  /**
   * Create new Score
   */
  constructor() {
    this._scoreCount = 0;
  }

  /**
   * Get score count
   *
   * @returns {Number} - Returns score count
   */
  getScoreCount() {
    return this._scoreCount;
  }

  /**
   * Set score count
   *
   * @param {Number} scoreCount - Score count
   *
   * @returns {void}
   */
  setScoreCount(scoreCount) {
    this._scoreCount = scoreCount;
  }
}