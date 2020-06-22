import React, { Component } from 'react';
import CanvasJSReact from '../../_assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
	//component did mount(api call)
	//parsen zu format wie in datapoints
	//this.state reinsetzen

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
				suffix: '$', // sessionStorage.getItem('waehrung')
			},
			data: [
				{
					type: 'column',
					color: 'rgb(220, 53, 69)',
					name: 'Unternehmenswert',
					showInLegend: true,
					toolTipContent: '{x}: {y}$',
					xValueFormatString: 'MMM YYYY',
					markerSize: 10,
					dataPoints: [{ x: new Date('2018- 10- 03'), y: 2000 }],
				},
				{
					name: 'Aktienkurswert',
					showInLegend: true,
					color: '#192489',
					type: 'line',
					toolTipContent: '{x}: {y}$',
					xValueFormatString: 'MMM YYYY',
					markerSize: 10,
					dataPoints: [
						{ x: new Date('2017- 01- 01'), y: 1792 },
						{ x: new Date('2017- 02- 20'), y: 1526 },
						{ x: new Date('2017- 03- 11'), y: 1955 },
						{ x: new Date('2017- 04- 05'), y: 1727 },
						{ x: new Date('2017- 05- 04'), y: 1523 },
						{ x: new Date('2017- 06- 21'), y: 1257 },
						{ x: new Date('2017- 07- 05'), y: 1520 },
						{ x: new Date('2017- 08- 03'), y: 1853 },
						{ x: new Date('2017- 09- 11'), y: 1738 },
						{ x: new Date('2017- 10- 03'), y: 1754 },

						{ x: new Date('2018- 01- 01'), y: 1792 },
						{ x: new Date('2018- 02- 20'), y: 1526 },
						{ x: new Date('2018- 03- 11'), y: 1955 },
						{ x: new Date('2018- 04- 05'), y: 1727 },
						{ x: new Date('2018- 05- 04'), y: 1523 },
						{ x: new Date('2018- 06- 21'), y: 1257 },
						{ x: new Date('2018- 07- 05'), y: 1520 },
						{ x: new Date('2018- 08- 03'), y: 1853 },
						{ x: new Date('2018- 09- 11'), y: 1738 },
						{ x: new Date('2018- 10- 03'), y: 1754 },
					],
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
