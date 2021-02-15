import React, { useState, useEffect } from 'react';
import { createMatrix } from './utils';
import './styles.css';

const SimpleTiles = () => {
	const [count, setCount] = useState([]);
	const [matrix] = useState(createMatrix());

	const random = () => {
		const remaining = matrix.flat(1);
		const indices = Array.from({ length: remaining.length }, (_, i) => i);

		while (remaining.length) {
			const randIndex = indices.sort(() => Math.random() - 0.5)[0];
			indices.splice(randIndex, 1);

			setCount((count) => {
				return count.concat(remaining[randIndex]);
			});
			remaining.splice(randIndex, 1);
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
