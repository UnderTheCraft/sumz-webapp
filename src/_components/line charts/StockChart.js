import React, { Component } from 'react';
import CanvasJSReact from '../../_assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// Init Werte fürs Stockchart
var berechneterKurswert = [{ x: new Date(), y: 0 }];
var waehrung = '';

class StockChart extends Component {
	constructor(props) {
		super(props);
		window.chartComponent = this;

		this.state = {
			stockdata: [],
		};
	}

	// Kurswert in Chart setzen
	setBerechneterKurswert(value) {
		berechneterKurswert = value;
	}

	// Währung festlegen
	setWaehrung(value) {
		if (value === 'USD') {
			waehrung = '$';
		} else if (value === 'EUR') {
			waehrung = '€';
		} else {
			waehrung = value;
		}
	}

	//Ausführen beim Bauen
	componentDidMount() {
		this.getStockData();
	}

	//API call für StockChart-Werte
	getStockData() {
		fetch(
			'https://sumz-backend.herokuapp.com/getStockChart/' +
				sessionStorage.getItem('link')
		).then((response) => {
			response.json().then((data) => {
				let dataPointsList = data.dataPoints;
				let stockdataset = new Array(dataPointsList.length);

				//Aufbereitung der Daten (runden etc.)
				for (let i = 0; i < dataPointsList.length; i++) {
					const dataPoint = dataPointsList[i];
					let value = Math.round(dataPoint.y * 100) / 100;

					stockdataset[i] = {
						x: new Date(dataPoint.x),
						y: value,
					};

					if (i === dataPointsList.length - 1) {
						sessionStorage.setItem('aktienkurs', value);
					}
				}

				this.setState({ stockdata: stockdataset });
			});
		});
	}

	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			theme: 'light2',
			dataPointWidth: 30,
			title: {
				text: sessionStorage.getItem('unternehmen'),
			},
			axisY: {
				title: 'Kurswert',
				includeZero: false,
				suffix: ' ' + waehrung,
				minimum: 0,
			},
			data: [
				{
					//Aktienkurs Linie
					name: 'Aktienwert',
					showInLegend: true,
					color: '#192489',
					type: 'line',
					toolTipContent: '{x}: {y} ' + waehrung,
					xValueFormatString: 'DD. MMM YYYY',
					markerSize: 5,
					dataPoints: this.state.stockdata,
				},
				{
					//Unternehmenswertbalken
					name: 'Unternehmenswert',
					showInLegend: true,
					color: 'rgb(220, 53, 69)',
					type: 'column',
					toolTipContent: '{x}: {y} ' + waehrung,
					xValueFormatString: 'DD. MMM YYYY',
					dataPoints: berechneterKurswert,
				},
			],
		};

		return (
			<div>
				<CanvasJSChart options={options} />
			</div>
		);
	}
}

export default StockChart;
