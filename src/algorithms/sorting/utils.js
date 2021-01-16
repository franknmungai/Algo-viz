export const getItems = (n) => {
	return Array.from({ length: n }, (_, i) => {
		return { value: i + 1, id: Math.random().toString() };
	});
};

export const shuffle = (list) => {
	let newList = [...list];
	newList.sort(() => Math.random() - 0.5);

	return newList;
};
