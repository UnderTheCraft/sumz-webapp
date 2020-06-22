import React, { Component } from 'react';
import CanvasJSReact from '../../_assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stockdata: [],
			uw: [],
		};
	}

	componentDidMount() {
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

					stockdataset[i] = { x: new Date(dataPoint.x), y: value };

					// vorübergehend:
					if (i === dataPointsList.length - 1) {
						let uwList = new Array(1);
						uwList[0] = { x: new Date(), y: value };
						this.setState({ uw: uwList });
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
			theme: 'light2', // "light1", "dark1", "dark2"
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
					xValueFormatString: 'MMM YYYY',
					markerSize: 10,
					dataPoints: this.state.uw,
				},
				{
					name: 'Aktienkurswert',
					showInLegend: true,
					color: '#192489',
					type: 'line',
					toolTipContent: '{x}: {y} $',
					xValueFormatString: 'MMM YYYY',
					markerSize: 10,
					dataPoints: this.state.stockdata,
				},
			],
		};

		return (
			<div>
				<CanvasJSChart
					options={options}
					/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default LineChart;
