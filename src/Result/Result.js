import { InfoCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../App.css';
import { Jumbotron } from '../_components/Jumbotron/Jumbotron';
import { Layout } from '../_components/Layout/Layout';
import LineChart from '../_components/line charts/Line Chart';
import './Result.css';

export class Result extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			unternehmen: sessionStorage.getItem('unternehmen'),
			methode: sessionStorage.getItem('methode'),
			link: sessionStorage.getItem('link'),
			ergebnis: '$ergebnis',
			entwicklung: '$entwicklung',
			unternehmenswert: '$unternehmenswert',
			bewertet: '$bewertet',
			empfehlung: '$empfehlung',
			cashflows: '$fcf',
			startDatum: '$startdatum',
		};
	}

	componentDidMount() {
		this.getUnternehmenswert();
	}

	async getUnternehmenswert() {
		const response = await fetch(
			'https://sumz-backend.herokuapp.com/getCorporateValue/' +
				sessionStorage.getItem('link') +
				'/' +
				sessionStorage.getItem('methodLink')
		);
		const myJson = await response.json();

		console.log(myJson);
	}

	render() {
		return (
			<>
				<Jumbotron></Jumbotron>
				<Layout>
					<div className="App-body">
						<h1 className="left">... hier kommt das Ergebnis!</h1>
						<p>
							{' '}
							Der Unternehmenswert von {this.state.unternehmen} wird mit der
							Methode {this.state.methode} auf {this.state.ergebnis} berechnet.
						</p>
						<br />
						<h1 className="left">
							Unternehmenswert: {this.state.unternehmenswert}
						</h1>
						<p>
							Die Aktien von {this.state.unternehmen} scheinen sich bis jetzt{' '}
							{this.state.entwicklung} zu entwickeln. Die Aktie ist{' '}
							{this.state.bewertet}!
						</p>
						<br />
						<h1 className="left">Aktienkurs</h1>

						<div className="divChart">
							<LineChart className="myChart" />
						</div>

						<br />
						<h1 className="left">Unsere Empfehlung: {this.state.empfehlung}</h1>
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
				</Layout>
			</>
		);
	}
}
