/*
 * Random number generators
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
module.exports.getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
