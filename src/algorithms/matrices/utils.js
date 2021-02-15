export const createMatrix = (m = 10, n = 30) => {
	return Array.from({ length: m }, (_, i) =>
		Array.from({ length: n }, (_, j) => `${i}${j}`)
	);
};
