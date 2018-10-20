import React from 'react';
import ReactDOM from 'react-dom';
import Content from './components/content';

import './styles/main.scss';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			testValue: 'Hello from React Props'
		};
	}

	render() {
		return (
			<section>
				<Content testValue={this.state.testValue}/>
			</section>);
	}
}

ReactDOM.render(<App />, document.querySelector('#app'));