import { HomeOutlined, RollbackOutlined } from '@ant-design/icons';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../App.css';
import apvFormel from '../_assets/FormelAPV.png';
import './APV.css';

const APV = () => (
	<div className="App-body">
		<h1>Wie wurde das Ergebnis berechnet?</h1>
		Die Bewertung einer Aktie erfolgt in dieser Anwendung mittels des
		Adjusted-Present-Value (APV) Verfahrens. Folgende Daten ihres gewählten
		Unternehmens werden für eine Berechnung herangezogen und interpretiert.
		<br />
		<br />
		Im Rahmen dieses Verfahrens wird der Wert des Eigenkapitals eines
		Unternehmens durch Abzug der Nettofinanzverbindlichkeiten von dem
		Unternehmensgesamtwert (Entity Value) ermittelt.
		<br />
		<br />
		<div>
			<img id="formel" src={apvFormel} alt="Formel" />
		</div>
		<br />
		Das APV-Verfahren ermittelt den Unternehmenswert in seiner „klassischen“
		Form zunächst unter der Annahme vollständiger Eigenfinanzierung (Marktwert
		des (fiktiv) unverschuldeten Unternehmens). Dazu werden die Free Cashflows
		mit den Eigenkapitalkosten des unverschuldeten Unternehmens diskontiert. Der
		Marktwert des unverschuldeten Unternehmens wird in einem zweiten Schritt um
		die durch die Verschuldung bewirkten diskontierten Steuerersparnisse aus den
		Fremdkapitalzinsen (Tax Shields) erhöht. Die Summe aus Marktwert des
		unverschuldeten Unternehmens (EVu) und Wertbeitrag der Tax Shields (WBTS)
		ergibt den Marktwert des Gesamtkapitals. Nach Abzug des Marktwertes des
		Fremdkapitals (FK) verbleibt der Marktwert des Eigenkapitals. Die Bewertung
		erfolgt nach der Höhe des Marktwertes des Eigenkapitals ihres gewählten
		Unternehmens.
		<br />
		<br />
		<div>
			<Button variant="danger" className="backToStartButton">
				<Link className="buttonlink" to="/">
					Startseite
					<HomeOutlined className="backToStartIcon" />
				</Link>
			</Button>
			<Button variant="danger" className="backButton">
				<Link className="buttonlink" to="/result">
					Zurück
					<RollbackOutlined className="backIcon" />
				</Link>
			</Button>
		</div>
		<br />
		<br />
	</div>
);

export default APV;
