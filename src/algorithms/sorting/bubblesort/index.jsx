import React, { useEffect, useState } from 'react';
import { getItems, shuffle } from './utils';
import './styles.css';

const BubbleSort = () => {
	const [items, setItems] = useState(() => getItems(100));

	useEffect(() => {
		setItems(shuffle(items));
	}, []);

	const sort = () => {
		for (let i = 0; i < items.length; i++) {
			for (let j = i + 1; j < items.length; j++) {
				if (items[i] > items[j]) {
					let temp = items[i];
					items[i] = items[j];
					items[j] = temp;
				}
			}
		}
	};
	return (
		<div className="bubble-sort root">
			<h2 className="title">Bubble Sort</h2>
			<div className="display">
				{items.map((item, i) => (
					<div
						className="bar"
						style={{ height: `${5 * item.value}px` }}
						key={item.id}
					/>
				))}
			</div>
		</div>
	);
};

export default BubbleSort;
