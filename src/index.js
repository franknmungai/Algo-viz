import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './algorithms/graphs/simple-graph';
import SimpleTiles from './algorithms/matrices/simple-tiles';
import BubbleSort from './algorithms/sorting/bubble-sort';
import HappySort from './algorithms/sorting/happy-sort';
import MergeSort from './algorithms/sorting/merge-sort';
import SelectionSort from './algorithms/sorting/selection-sort';
import App from './App.js';

ReactDOM.render(
	<React.Fragment>
		<BubbleSort />
		<HappySort />
		<SelectionSort />
		<MergeSort />
		<SimpleTiles />
		<Graph color="red" />
	</React.Fragment>,
	document.getElementById('root')
);
