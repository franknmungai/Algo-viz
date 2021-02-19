import React, { useState } from 'react';
import { createMatrix } from './utils';
import { delay } from '../../utils/async-delay';
import './styles.css';

const SimpleTiles = () => {
	const [count, setCount] = useState([]);
	const [matrix] = useState(createMatrix());

	const random = async () => {
		const remaining = matrix.flat(1);
		const indices = Array.from({ length: remaining.length }, (_, i) => i);

		let iterations = 0;
		while (remaining.length >= 100) {
			const randIndices = indices.sort(() => Math.random() - 0.5);
			const randIndex = randIndices.pop();
			setCount((count) => {
				return count.concat(remaining[randIndex]);
			});
			remaining.splice(randIndex, 1);
			await delay(20);
			iterations++;
			if (iterations >= 5000) break;
		}
	};

	return (
		<div className="matrices root">
			<div className="tiles">
				<h1 className="title">Tiles</h1>
				<p className="text">{count.length} contributions in the last year</p>
				<div className="controls">
					<button className="btn random" onClick={random}>
						Random
					</button>
				</div>
				{matrix.map((row, i) => (
					<div className="row" key={i}>
						{row.map((tile) => {
							const clicked = count.includes(tile);
							return (
								<Tile
									key={tile}
									id={tile}
									onClick={() =>
										!clicked && setCount((count) => count.concat(tile))
									}
									isClicked={clicked}
								/>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
};

const Tile = ({ id, onClick, isClicked }) => (
	<div className={`tile ${isClicked && 'clicked'}`} onClick={onClick}></div>
);
export default SimpleTiles;
