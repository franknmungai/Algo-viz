import React, { useState, useEffect } from 'react';
import { createGraph, createNodes } from './utils';
import './styles.css';
import { delay } from '../../utils/async-delay';

const graph = createGraph(500);

const Graph = () => {
	const [nodes, setNodes] = useState(() => createNodes(graph));
	const [visited, setVisited] = useState([]);
	const [startNode, setStartNode] = useState(0);

	useEffect(() => console.log(startNode), [startNode]);
	useEffect(() => {
		const newNodes = [...nodes];
		newNodes.sort(() => Math.random() - 0.5);
		setNodes([...newNodes]);
		// eslint-disable-next-line
	}, []);

	const bfs = async (node) => {
		console.log({ node });
		const visited = [node];
		setVisited((nodes) => nodes.concat(node));
		const queue = [node];

		while (queue.length) {
			const vertex = queue.unshift();
			await delay(7);
			for (const neighbor of graph[vertex]) {
				if (!visited.includes(neighbor)) {
					queue.push(neighbor);
					visited.push(neighbor);
					setVisited((nodes) => [...nodes, neighbor]);
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
			setVisited((nodes) => nodes.concat(node));
			await delay(7);
			for (const neighbor of graph[node]) {
				if (!visited.includes(neighbor)) {
					setVisited((nodes) => [...nodes, neighbor]);
					stack.push(neighbor);
					visited.push(node);
					await delay(7);
				}
			}
		}
	};

	const rewind = async () => {
		for (let i = 0; i < visited.length; i++) {
			await delay(7);
			setVisited((nodes) => nodes.filter((node) => node !== visited[i]));
		}
	};
	return (
		<div className="root">
			<h1 className="title">Graphs</h1>
			<div className="controls">
				<button onClick={bfs.bind(this, startNode)}>Breadth First</button>
				<button className="dfs" onClick={dfs.bind(this, startNode)}>
					Depth First
				</button>
				<button className="dfs" onClick={rewind}>
					Rewind
				</button>
				<button onClick={() => setVisited([])}>Refresh</button>
			</div>
			<div className="graph">
				{nodes.map((node) => (
					<Vertex
						key={node}
						onClick={() => {
							setStartNode(node);
							setVisited((nodes) => nodes.concat(node));
						}}
						visited={visited.includes(node)}
					/>
				))}
			</div>
		</div>
	);
};

const Vertex = ({ visited, onClick }) => {
	return <div className={`vertex ${visited && 'visited'}`} onClick={onClick} />;
};
export default Graph;
