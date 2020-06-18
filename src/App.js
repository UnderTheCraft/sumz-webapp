import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { About } from './About/About';
import './App.css';
import { Contact } from './Contact/Contact';
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
				<Route path="/about" component={About} />
				<Route path="/contact" component={Contact} />
				<Route path="/selection" component={Selection} />
				<Route path="/result" component={Result} />
				<Route component={NoMatch} />
			</Switch>
		</>
	);
}

export default App;
