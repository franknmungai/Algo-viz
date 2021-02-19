/**
 * Creates a matrix m x n
 * @param {number} m columns
 * @param {number} n rows
 * @returns {number[][]}
 */
export const createMatrix = (m = 10, n = 30) => {
	return Array.from({ length: m }, (_, i) =>
		Array.from({ length: n }, (_, j) => `${i}${j}`)
	);
};

/**
 * Generates a random number between a and b
 * @param {number} a lower limit value
 * @param {number} b upper limit, non-inclusive
 * @returns {number}
 */
export const randInt = (a, b) => {
	return Math.floor(Math.random() * b - a);
};

randInt(2, 7); // 5
