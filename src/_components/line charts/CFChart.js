import React, { Component } from 'react';
import CanvasJSReact from '../../_assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var pastFCF = [{ x: new Date(), y: 0 }];
var futureFCF = [{ x: new Date(), y: 0 }];

class CFChart extends Component {
	constructor(props) {
		super(props);
		window.fcfChartComponent = this;

		this.state = {};
	}

	setPastFCF(value) {
		pastFCF = value;
	}

	setFutureFCF(value) {
		futureFCF = value;
	}

	getStockData() {
		fetch(
			'https://sumz-backend.herokuapp.com/getStockChart/' +
				sessionStorage.getItem('link')
		).then((response) => {
			response.json().then((data) => {
				let dataPointsList = data.dataPoints;
				let stockdataset = new Array(dataPointsList.length);

				for (let i = 0; i < dataPointsList.length; i++) {
					const dataPoint = dataPointsList[i];
					let value = Math.round(dataPoint.y * 100) / 100;

					stockdataset[i] = {
						x: new Date(dataPoint.x),
						y: value,
					};
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
			theme: 'light2', // "light1", "dark1", "dark2"
			dataPointWidth: 30,
			title: {
				text: 'Free Cash Flow Verlauf',
			},
			axisY: {
				title: 'Free Cash Flow',
				includeZero: false,
				suffix: ' $', // sessionStorage.getItem('waehrung')
			},
			data: [
				{
					name: 'Vergangene Free Cash Flows',
					showInLegend: true,
					color: '#192489',
					type: 'line',
					toolTipContent: '{x}: {y} $',
					xValueFormatString: 'MMM YYYY',
					markerSize: 10,
					dataPoints: pastFCF,
				},
				{
					name: 'Vorhergesagte Free Cash Flows',
					showInLegend: true,
					color: 'rgb(220, 53, 69)',
					type: 'line',
					toolTipContent: '{x}: {y} $',
					xValueFormatString: 'MMM YYYY',
					markerSize: 10,
					dataPoints: futureFCF,
				},
			],
		};

		return (
			<div>
				<CanvasJSChart
					options={options}
					id="test"
					/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default CFChart;
