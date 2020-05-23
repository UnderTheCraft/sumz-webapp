import React from 'react';
//import Navbar from 'react-bootstrap/Navbar'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { NoMatch } from './NoMatch';
import { Contact } from './Contact';
import { NavigationBar } from './components/NavigationBar';


/*function App() {
  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt="SUMZ"
            src="https://octodex.github.com/images/Fintechtocat.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
			  SUMZ Unternehmensbewertung
			</Navbar.Brand>
      </Navbar>

      <header className="App-header">
        <h1>This is a fancy test app!</h1>
        <img src="https://octodex.github.com/images/Fintechtocat.png" className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}*/

function App2() {
  return (
    <>
      <NavigationBar></NavigationBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NoMatch} />
        </Switch>
    </>
  );
}

export default App2;
