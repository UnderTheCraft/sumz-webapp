import { InfoCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import '../App.css';
import { Jumbotron } from '../_components/Jumbotron/Jumbotron';
import { Layout } from '../_components/Layout/Layout';
import CFChart from '../_components/line charts/CFChart';
import StockChart from '../_components/line charts/StockChart';
import './Result.css';

export class Result extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			unternehmen: sessionStorage.getItem('unternehmen'),
			methode: sessionStorage.getItem('methode'),
			link: sessionStorage.getItem('link'),
			methodLink: sessionStorage.getItem('methodLink'),
			aktienanzahl: 0,
			unternehmenswert: '$unternehmenswert',
			bewertet: '$bewertet',
			empfehlung: '$empfehlung',
			marktkapitalisierung: '§marktkapitalisierung',
		};
	}

	// Aufruf beim bauen
	componentDidMount() {
		this.getUnternehmenswert();
	}

	getUnternehmenswert() {
		let valForcast = this.getValForecast();

		let linkApi = 'https://sumz-backend.herokuapp.com/getCorporateValue';

		linkApi += '/' + sessionStorage.getItem('link');
		linkApi += '/' + sessionStorage.getItem('methodLink');
		linkApi += '?last_date_forecast=' + valForcast;
		linkApi += '&risk_free_interest_rate=' + sessionStorage.getItem('zinssatz');
		linkApi += '&market_risk_premium=' + sessionStorage.getItem('mrp');
		linkApi += '&fcf_growth_rate=' + sessionStorage.getItem('fcfRate');

		fetch(linkApi).then((response) => {
			response.json().then((data) => {
				// Festlegung von Variablen in Abhängigkeit der Ergebnisse
				let unsereEmpfehlung = '';
				if (data.Recommendation === 'Sell') {
					unsereEmpfehlung = 'Verkaufen';
				} else if (data.Recommendation === 'Hold') {
					unsereEmpfehlung = 'Halten';
				} else if (data.Recommendation === 'Buy') {
					unsereEmpfehlung = 'Kaufen';
				}

				let unsereBewertung = '';
				let berechneterKurs =
					data['Enterprise Value'] / data['Amount of Shares'];
				berechneterKurs = Math.round(berechneterKurs * 100) / 100;

				if (
					berechneterKurs > parseFloat(sessionStorage.getItem('aktienkurs'))
				) {
					unsereBewertung = 'unterbewertet';
				} else {
					unsereBewertung = 'überbewertet';
				}

				// Berechneter Kurswert in Chart einfügen
				this.setStockChart(berechneterKurs, data);
				// FCF Chart befüllen
				this.setFCFChart(data);

				// this.state befülllen für HTML
				this.setState(
					{
						unternehmenswert: new Intl.NumberFormat('de-DE', {
							style: 'currency',
							currency: data.Currency,
						}).format(data['Enterprise Value']),
						marktkapitalisierung: new Intl.NumberFormat('de-DE', {
							style: 'currency',
							currency: data.Currency,
						}).format(data['Market Capitalization']),
						aktienanzahl: data['Amount of Shares'],
						empfehlung: unsereEmpfehlung,
						bewertet: unsereBewertung,
					},
					() => {
						// blur entfernen
						document.getElementById('loading').style.display = 'none';
						document.getElementById('flaeche').style.webkitFilter = 'none';
					}
				);
			});
		});
	}

	// StockChart befüllen mit
	setStockChart(berechneterKurs, data) {
		var uwV = [
			{
				x: new Date(),
				y: berechneterKurs,
			},
		];
		// public Call auf Methoden in StockChart.js
		window.chartComponent.setBerechneterKurswert(uwV);
		window.chartComponent.setWaehrung(data.Currency);
	}

	// FCFChart befüllen
	setFCFChart(value) {
		var forecast = value.FCF.Forecast;
		var past = value.FCF.Past;

		var futureFCF = new Array(forecast.length);
		var pastFCF = new Array(past.length);

		//Forecast befüllen
		for (let i = 0; i < forecast.length; i++) {
			futureFCF[i] = {
				x: new Date(forecast[i].date),
				y: Math.round(forecast[i].FCF * 100) / 100,
			};
		}

		// Past befüllen
		for (let i = 0; i < past.length; i++) {
			pastFCF[i] = {
				x: new Date(past[i].date),
				y: Math.round(past[i].FCF * 100) / 100,
			};
		}

		// public Call auf Methoden in CFChart.js
		window.fcfChartComponent.setPastFCF(pastFCF);
		window.fcfChartComponent.setFutureFCF(futureFCF);
		window.fcfChartComponent.setWaehrung(value.Currency);
	}

	//Finanzdaten bis aufschlüsseln für API call z.B. 2019-Q4 -> 31.12.2019
	getValForecast() {
		let valForcast = '3d.mm.yyyy';
		let expertQuartal = sessionStorage.getItem('quartal');

		let year = expertQuartal.substr(0, 4);
		let quarter = expertQuartal.substr(6, 1);

		valForcast = valForcast.replace('yyyy', year);
		if (quarter === '1' || quarter === '4') {
			valForcast = valForcast.replace('d', '1');
			valForcast =
				quarter === '1'
					? valForcast.replace('mm', '01')
					: valForcast.replace('mm', '12');
		} else {
			valForcast = valForcast.replace('d', '0');
			valForcast = valForcast.replace('mm', '0' + parseInt(quarter) * 3);
		}
		return valForcast;
	}

	render() {
		return (
			<>
				<Jumbotron></Jumbotron>
				<Layout>
					<div id="loading" className="loading">
						<Spinner animation="border" variant="danger" />
					</div>
					<div id="flaeche" className="flaeche">
						<div className="App-body">
							<h1 className="left">... hier kommt das Ergebnis!</h1>
							<p className="left">
								{' '}
								Der Unternehmenswert von {this.state.unternehmen} wird mit der
								Methode {this.state.methode} ({this.state.methodLink})
								berechnet.
							</p>
							<br />
							<h1 className="left">
								Marktkapitalisierung:
								<br />
								{this.state.marktkapitalisierung}
							</h1>
							<br />
							<h1 className="left">
								Berechneter Unternehmenswert:
								<br />
								{this.state.unternehmenswert}
							</h1>
							<p className="left">
								Die Aktien von {this.state.unternehmen} scheinen im aktuellen
								Aktienkurs {this.state.bewertet} zu sein!
							</p>
							<br />
							<h1 className="left">Aktienkurs</h1>
							<div className="divChart">
								<StockChart className="myChart" />
							</div>

							<br />
							<h1 className="left">Free Cash Flow</h1>
							<div className="divChart">
								<CFChart className="myChart" />
							</div>

							<br />
							<h1 className="left">
								Unsere Empfehlung:
								<br />
								{this.state.empfehlung}
							</h1>
							<br />
							<div className="infoicon">
								<Button variant="danger">
									<Link className="buttonlink" to="/selection">
										Neue Berechung
										<PlayCircleOutlined className="homeIcon" />
									</Link>
								</Button>
								<Link className="infoicon" to="/about">
									<InfoCircleOutlined className="infoicon" />
								</Link>
							</div>
							<br />
						</div>
					</div>
				</Layout>
			</>
		);
	}
}
