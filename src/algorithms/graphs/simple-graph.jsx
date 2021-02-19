import React, { useState, useRef } from 'react';
import { createGraph, createNodes } from './utils';
import './styles.css';
import { delay } from '../../utils/async-delay';

const graph = createGraph(500);

const Graph = () => {
	const [nodes] = useState(() => createNodes(graph));
	const [visited, setVisited] = useState([]);
	const startNode = useRef();

	const bfs = async (node = 0) => {
		const visited = [node];
		setVisited((nodes) => nodes.concat(node));
		const queue = [node];

		while (queue.length) {
			const vertex = queue.unshift();
			await delay(7);
			for (const neighbor of graph[vertex]) {
				if (!visited.includes(neighbor)) {
					visited.push(neighbor);
					setVisited((nodes) => [...nodes, neighbor]);
					queue.push(neighbor);
					await delay(7);
				}
			}
		}
	};

	const dfs = () => {};
	return (
		<div className="root">
			<h1 className="title">Graphs</h1>
			<div className="controls">
				<button onClick={bfs.bind(this, startNode.current)}>
					Breadth First
				</button>
				<button className="dfs" onClick={dfs.bind(this, startNode.current)}>
					Depth First
				</button>
			</div>
			<div className="graph">
				{nodes.map((node) => (
					<div
						className={`vertex ${visited.includes(node) && 'visited'}`}
						key={node}
						onclick={() => (startNode.current = node)}
					/>
				))}
			</div>
		</div>
	);
};

export default Graph;
