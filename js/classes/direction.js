import { DIRECTION_RIGHT } from '../constants';

/**
 * Class represents Direction component
 */
export default class Direction {
  /**
   * Create new Direction
   */
  constructor() {
    this._direction = DIRECTION_RIGHT;
  }

  /**
   * Get direction type
   *
   * @returns {String} - Returns direction type
   */
  getDirection() {
    return this._direction;
  }

  /**
   * Set direction type
   *
   * @param {String} direction - Direction type
   *
   * @returns {void}
   */
  setDirection(direction) {
    this._direction = direction;
  }
}
