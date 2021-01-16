import React, { useEffect, useState } from 'react';
import { getItems, shuffle } from './utils';
import { delay } from '../../utils/async-delay';
import './styles.css';

const HappySort = () => {
	const [collection, setCollection] = useState(() => getItems(100));
	const [a, setA] = useState(collection[0]);
	const [b, setB] = useState(collection[1]);
	const [sorting, setSorting] = useState(false);

	const [sec, setSec] = useState(0);
	const [min, setMin] = useState(0);

	useEffect(() => {
		setCollection((items) => shuffle(items));
	}, []);

	const timer = () => {
		setSec((sec) => {
			return sec >= 59 ? 0 : (sec += 1);
		});
	};

	useEffect(() => {
		if (!sorting) return;
		const timerId = setInterval(timer, 1000);
		return () => clearTimeout(timerId);

		// eslint-disable-next-line
	}, [sorting]);

	useEffect(() => {
		if (sec + 1 > 59) {
			setMin((min) => (min += 1));
		}
	}, [sec]);

	const sort = async () => {
		if (sorting) return;
		setSorting(true);
		const items = [...collection];
		for (let i = 0; i < items.length; i++) {
			setA(items[i]);
			for (let j = i + 1; j < items.length; j++) {
				setB(items[j]);

				await delay(0.004);
				if (items[i].value > items[j].value) {
					let left = items[j];
					items[j] = items[i];
					items[i] = left;
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
		setSec(0);
		setMin(0);
	};

	const twoDigit = (num) => {
		const { length } = num.toString();
		return length === 1 ? '0' + num : num;
	};

	return (
		<div className="bubble-sort root">
			<h2 className="title">Frank's Sort</h2>
			<div className="controls">
				<button className="btn sort" onClick={sort}>
					Sort
				</button>
				<button className="btn shuffle" onClick={reshuffle}>
					Shuffle
				</button>
				<button className="btn timer">{`${twoDigit(min)}:${twoDigit(
					sec
				)}`}</button>
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

export default HappySort;
