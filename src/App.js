import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { About } from './About/About';
import { Home } from './Home/Home';
import { NoMatch } from './NoMatch/NoMatch';
import { Result } from './Result/Result';
import { Selection } from './Selection/Selection';
import { NavigationBar } from './_components/NavigationBar/NavigationBar';

function App() {
	return (
		<>
			<NavigationBar></NavigationBar>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/selection" component={Selection} />
				<Route path="/about" component={About} />
				<Route path="/result" component={Result} />
				<Route component={NoMatch} />
			</Switch>
		</>
	);
}

export default App;
