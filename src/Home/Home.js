import React from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import '../App.css';
import { Jumbotron } from '../_components/Jumbotron/Jumbotron';
import { Layout } from '../_components/Layout/Layout';

export const Home = () => (
	<>
		<Jumbotron></Jumbotron>
		<Layout>
			<div className="App-body">
				<p>
					Diese Anwendung wird zur Berechung des Unternehmenswertes verwendet!
					Das Brown-Rozeff-Modell wird zur Prognose zukünftiger Casflows
					verwendet. Die Daten der 30 Dax-Unternehmen sind im Backend dieser App
					gespeichert und werden je nach Eingabe des Benutzers herangezogen.
					Basierend auf der gewählten Methode wird der Unternehmenswert
					berechnet.
				</p>
				<br />
				<Button className="Button-start" variant="danger">
					<NavLink className="buttonlink" to="/selection">
						Start
					</NavLink>
				</Button>
			</div>
		</Layout>
	</>
);
