/**
 * Class represents Food component
 */
export default class Food {
  /**
   * Create new Food
   */
  constructor() {
    this._foodBound = {};
  }

  /**
   * Get food bound
   *
   * @returns {Object} - Returns food bound
   */
  getFoodBound() {
    return this._foodBound;
  }

  /**
   * Set food bound
   *
   * @param {Object} foodBound - Food bound
   *
   * @returns {void}
   */
  setFoodBound(foodBound) {
    this._foodBound = foodBound;
  }
}
