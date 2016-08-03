import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const commandsArr = [
	{
		name : "help",
		desc : "here's a list of all available commands",
		alias: "h"
	},
	{
		name : "clear",
		desc : "clears terminal screen",
		alias: "Ctrl+L"
	},
	{
		name: "touch",
		desc: "create new configuration"
	},
	{
		name: "save",
		desc: "grab/download your files",
		alias: "gimme"
	}
];

App.propTypes = {
	commands : React.PropTypes.array
}
App.defaultProps = {
	commands : commandsArr
}
ReactDOM.render(<App />, document.getElementById('root'));