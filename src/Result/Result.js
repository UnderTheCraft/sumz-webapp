import { InfoCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../App.css';
import { Jumbotron } from '../_components/Jumbotron/Jumbotron';
import { Layout } from '../_components/Layout/Layout';
import LineChart from '../_components/line charts/Line Chart';
import './Result.css';
import Spinner from 'react-bootstrap/Spinner';

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
		};
	}

	componentDidMount() {
		this.getUnternehmenswert();
	}

	getUnternehmenswert() {
		fetch(
			'https://sumz-backend.herokuapp.com/getCorporateValue/' +
				sessionStorage.getItem('link') +
				'/' +
				sessionStorage.getItem('methodLink')
		).then((response) => {
			response.json().then((data) => {
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
				var uwV = [{ x: new Date(), y: berechneterKurs }];
				window.chartComponent.setBerechneterKurswert(uwV);

				this.setState(
					{
						unternehmenswert: new Intl.NumberFormat('de-DE', {
							style: 'currency',
							currency: data.Currency,
						}).format(data['Enterprise Value']),
						aktienanzahl: data['Amount of Shares'],
						empfehlung: unsereEmpfehlung,
						bewertet: unsereBewertung,
					},
					() => {
						document.getElementById('loading').style.display = 'none';
						document.getElementById('flaeche').style.webkitFilter = 'none';
					}
				);
			});
		});
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
							<p>
								{' '}
								Der Unternehmenswert von {this.state.unternehmen} wird mit der
								Methode {this.state.methode} ({this.state.methodLink})
								berechnet.
							</p>
							<br />
							<h1 className="left">
								Unternehmenswert: {this.state.unternehmenswert}
							</h1>
							<p>
								Die Aktien von {this.state.unternehmen} scheinen im aktuellen
								Aktienkurs {this.state.bewertet} zu sein!
							</p>
							<br />
							<h1 className="left">Aktienkurs</h1>

							<div className="divChart">
								<LineChart className="myChart" />
							</div>

							<br />
							<h1 className="left">
								Unsere Empfehlung: {this.state.empfehlung}
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
