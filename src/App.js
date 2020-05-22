import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import logo from './DHBW_Logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">

		<link
		  rel="stylesheet"
		  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
		  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
		  crossorigin="anonymous"
		/>

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
}

function App2() {
  return (
    <div className="App">


      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h1>SUMZ@DHBW Web App!</h1> //Fehler: header ist hinter Logo
      </header>
      <body className="App-body">
      <p>
      Diese Anwendung wird zur Berechung des Unternehmenswertes verwendet! Das Brown-Rozeff-Modell wird zur Prognose zukünftiger Casflows verwendet.
      Die Daten der 30 Dax- Unternehmen sind im Backend dieser App gespeichert und werden je nach Eingabe des Benutzers herangezogen. Basierend auf der gewählten Methode wird der Unternehmenswert berechnet.
      </p>
      <Button className="Button-start" variant="danger">Start</Button>
      </body>
    </div>
  );
}

export default App2;
