import React, { Component } from 'react';

class App extends Component {
	render() {
		return (
			<div>
				for test!
				{ this.props.children }
			</div>
		);
	}
}

export default App;