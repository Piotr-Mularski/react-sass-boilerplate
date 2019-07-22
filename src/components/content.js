import React from 'react';

const Content = (props) => (
	<div className="react-content">
		<h2>{props.testValue}</h2>
		<p>This content comes from react component, which means, somehow this has worked.</p>
	</div>
);

export default Content;
