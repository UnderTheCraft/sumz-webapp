import React, { Component } from 'react';
import CanvasJSReact from '../../_assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var pastFCF = [{ x: new Date(), y: 0 }];
var futureFCF = [{ x: new Date(), y: 0 }];
var waehrung = '';

class CFChart extends Component {
	constructor(props) {
		super(props);
		window.fcfChartComponent = this;

		this.state = {};
	}

	// Vergangheits FCF setzen
	setPastFCF(value) {
		pastFCF = value;
	}

	// Vorhergesagte FCF setzen
	setFutureFCF(value) {
		futureFCF = value;
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

	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			theme: 'light2',
			dataPointWidth: 30,
			title: {
				text: 'Free Cash Flow Verlauf',
			},
			axisY: {
				title: 'Free Cash Flow',
				includeZero: false,
				suffix: ' ' + waehrung,
			},
			data: [
				{
					//Vergangene Free Cash Flows Linie
					name: 'Vergangene Free Cash Flows',
					showInLegend: true,
					color: '#192489',
					type: 'line',
					toolTipContent: '{x}: {y} ' + waehrung,
					xValueFormatString: 'MMM YYYY',
					markerSize: 10,
					dataPoints: pastFCF,
				},
				{
					//Vorhergesagte Free Cash Flows Linie
					name: 'Vorhergesagte Free Cash Flows',
					showInLegend: true,
					color: 'rgb(220, 53, 69)',
					type: 'line',
					toolTipContent: '{x}: {y} ' + waehrung,
					xValueFormatString: 'MMM YYYY',
					markerSize: 10,
					dataPoints: futureFCF,
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

export default CFChart;
