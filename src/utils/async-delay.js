export const delay = (n) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), n);
	});
};
