import React, { useEffect, useState } from 'react';
import { getItems, shuffle } from './utils';
import { delay } from '../../../utils/async-delay';
import './styles.css';

const BubbleSort = () => {
	const [collection, setCollection] = useState(() => getItems(100));
	const [a, setA] = useState(collection[0]);
	const [b, setB] = useState(collection[1]);
	const [sorting, setSorting] = useState(false);

	const [sec, setSec] = useState('00');
	const [min, setMin] = useState('00');

	useEffect(() => {
		setCollection((items) => shuffle(items));
	}, []);

	useEffect(() => {});

	const sort = async () => {
		if (sorting) return;
		setSorting(true);
		const items = [...collection];
		for (let i = 0; i < items.length; i++) {
			setA(items[i]);
			for (let j = 0; j < items.length - i - 1; j++) {
				setB(items[j]);

				await delay(0.004);
				if (items[j].value > items[j + 1].value) {
					let left = items[j];
					items[j] = items[j + 1];
					items[j + 1] = left;
				}
				setCollection([...items]);

				await delay(0.004);
			}
		}

		setCollection([...items]);
		setSorting(false);
	};

	const reshuffle = () => {
		if (sorting) return;
		setCollection((items) => shuffle(items));
	};

	const time = () => {
		if (!sorting) return;
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
				<button className="btn timer">{`${min} : ${sec}`}</button>
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
