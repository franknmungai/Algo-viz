import React, { useEffect, useState } from 'react';
import { getItems, shuffle } from './utils';
import { delay } from '../../utils/async-delay';
import './styles.css';

const MergeSort = () => {
	const [collection, setCollection] = useState(() => getItems(100));

	const [sorting, setSorting] = useState(false);
	const [right, setRight] = useState([]);
	const [left, setLeft] = useState([]);
	const [results, setResults] = useState([]);

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

	async function mergeSort(arr) {
		setSorting(true);
		if (arr.length === 1) {
			return arr;
		}
		const midpoint = Math.floor(arr.length / 2);
		const left = arr.slice(0, midpoint);
		const right = arr.slice(midpoint);

		setRight(right);
		setLeft(left);

		await delay(20);
		const results = await merge(await mergeSort(left), await mergeSort(right));
		setCollection([...results]);
		return results;
	}

	async function merge(left, right) {
		let results = [];
		while (left.length && right.length) {
			if (left[0].value < right[0].value) {
				results.push(left.shift());
			} else {
				results.push(right.shift());
			}
		}

		await delay(20);
		setResults([...results]);

		return [...results, ...left, ...right];
	}

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
			<h2 className="title">Merge Sort 🦄</h2>
			<div className="controls">
				<button
					className="btn sort"
					onClick={async () => {
						await mergeSort(collection);
						setSorting(false);
					}}
				>
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
						className={`bar ${right.includes(item.id) && 'a'} ${
							left.includes(item.id) && 'b'
						} ${results.includes(item.id) && 'merged'}`}
						style={{ height: `${5 * item.value}px` }}
						key={item.id}
					/>
				))}
			</div>
		</div>
	);
};

export default MergeSort;
