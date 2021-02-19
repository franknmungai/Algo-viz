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

	const dfs = async (node = 0) => {
		const visited = [node];
		const stack = [node];

		while (stack.length) {
			const node = stack.pop();
			visited.push(node);
			setVisited((nodes) => nodes.concat(node));
			await delay(7);
			for (const neighbor of graph[node]) {
				if (!visited.includes(neighbor)) {
					setVisited((nodes) => [...nodes, neighbor]);
					stack.push(neighbor);
					await delay(7);
				}
			}
		}
	};
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
					<Vertex
						key={node}
						onClick={() => {
							startNode.current = node;
							setVisited((nodes) => nodes.concat(node));
						}}
					/>
				))}
			</div>
		</div>
	);
};

const Vertex = ({ visited, onClick }) => {
	return <div className={`vertex ${visited && 'visited'}`} onclick={onClick} />;
};
export default Graph;
