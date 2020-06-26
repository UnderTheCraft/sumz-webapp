import React, { Component } from 'react';
import CanvasJSReact from '../../_assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var berechneterKurswert = [{ x: new Date(), y: 0 }];

class LineChart extends Component {
	constructor(props) {
		super(props);
		window.chartComponent = this;

		this.state = {
			stockdata: [],
		};
	}

	setBerechneterKurswert(value) {
		berechneterKurswert = value;
	}

	componentDidMount() {
		this.getStockData();
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
				text: sessionStorage.getItem('unternehmen'),
			},
			axisY: {
				title: 'Kurswert',
				includeZero: false,
				suffix: ' $', // sessionStorage.getItem('waehrung')
			},
			data: [
				{
					type: 'column',
					color: 'rgb(220, 53, 69)',
					name: 'Unternehmenswert',
					showInLegend: true,
					toolTipContent: '{x}: {y} $',
					xValueFormatString: 'DD. MMM YYYY',
					dataPoints: berechneterKurswert,
				},
				{
					name: 'Aktienkurswert',
					showInLegend: true,
					color: '#192489',
					type: 'line',
					toolTipContent: '{x}: {y} $',
					xValueFormatString: 'DD. MMM YYYY',
					markerSize: 5,
					dataPoints: this.state.stockdata,
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

export default LineChart;
