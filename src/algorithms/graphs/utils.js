const createGraph = (depth = 5) => {
	const graph = {
		0: [1, 2],
		[depth]: [],
	};

	for (let i = 1; i < depth; i++) {
		graph[i] = [i - 1];
		for (let j = i; j < i + 4 && j < depth; j++) {
			graph[i].push(j);
		}
	}
	return graph;
};

const createNodes = (graph) => {
	const nodes = [];

	for (const node in graph) {
		const v = parseInt(node);

		if (!nodes.includes(v)) {
			nodes.push(v);
		}

		for (const adj of graph[node]) {
			if (!nodes.includes(adj)) {
				nodes.push(adj);
			}
		}
	}
	return nodes;
};

const graph = createGraph(6);
const nodes = createNodes(graph);

console.log({ graph, nodes, nodesLen: nodes.length });
