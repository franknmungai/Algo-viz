import React, { useEffect, useState } from 'react';
import { getItems, shuffle } from './utils';
import { delay } from '../../../utils/async-delay';
import './styles.css';

const BubbleSort = () => {
	const [collection, setCollection] = useState(() => getItems(100));
	const [a, setA] = useState(collection[0]);
	const [b, setB] = useState(collection[1]);

	useEffect(() => {
		setCollection((items) => shuffle(items));
	}, []);

	const sort = async () => {
		const items = [...collection];
		for (let i = 0; i < items.length; i++) {
			setA(items[i]);
			for (let j = i + 1; j < items.length; j++) {
				setB(items[j]);

				await delay(0.004);
				if (items[i].value > items[j].value) {
					let temp = items[i];
					items[i] = items[j];
					items[j] = temp;
				}
				setCollection([...items]);

				await delay(0.004);
			}
		}

		setCollection([...items]);
	};

	const reshuffle = () => {
		setCollection((items) => shuffle(items));
	};
	return (
		<div className="bubble-sort root">
			<h2 className="title">Bubble Sort</h2>
			<div className="controls">
				<button className="btn sort" onClick={sort}>
					Sort
				</button>
				<button className="btn shuffle" onClick={reshuffle}>
					Shuffle
				</button>
			</div>
			<div className="display">
				{collection.map((item, i) => (
					<div
						className={`bar ${item.id === a.id && 'a'} ${
							item.id === b.id && 'b'
						}`}
						style={{ height: `${5 * item.value}px` }}
						key={item.id}
					/>
				))}
			</div>
		</div>
	);
};

export default BubbleSort;
