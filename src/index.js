import React from 'react';
import ReactDOM from 'react-dom';
import BubbleSort from './algorithms/sorting/bubble-sort';
import HappySort from './algorithms/sorting/happy-sort';
import App from './App.js';

ReactDOM.render(
	<React.Fragment>
		<BubbleSort />
		<HappySort />
	</React.Fragment>,
	document.getElementById('root')
);
