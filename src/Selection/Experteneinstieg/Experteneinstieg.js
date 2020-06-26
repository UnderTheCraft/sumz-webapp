import { InfoCircleOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React from 'react';
import {
	Accordion,
	AccordionCollapse,
	AccordionToggle,
	Button,
	Card,
	FormGroup,
} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../Selection.css';

export class Experteneinstieg extends React.Component {
	constructor(props) {
		super(props);

		this.saveFactors = this.saveFactors.bind(this);
		this.resetExperteneinstieg = this.resetExperteneinstieg.bind(this);

		this.state = {
			factors: { mrp: 0, zinssatz: 0, quartal: '' },
			disableButtonLoading: true,
		};
	}

	componentDidMount() {
		this.getFactors();
	}

	getFactors() {
		fetch('https://sumz-backend.herokuapp.com/getDefaultExpertValues').then(
			(response) => {
				response.json().then((data) => {
					this.setState(
						{
							factors: {
								mrp: data.market_risk_premium,
								zinssatz: data.risk_free_interest,
								quartal: '2019-Q4',
							},
						},
						() => {
							this.setState({ disableButtonLoading: false });
						}
					);
				});
			}
		);
	}

	saveFactors() {
		var mrpVal = document.getElementById('mrp').value;
		var zinssatzVal = document.getElementById('zinssatz').value;
		var quartalVal = document.getElementById('datepicker').value;

		if (mrpVal === '') {
			mrpVal = this.state.factors.mrp;
		}
		if (zinssatzVal === '') {
			zinssatzVal = this.state.factors.zinssatz;
		}

		this.setState(
			{ factors: { mrp: mrpVal, zinssatz: zinssatzVal, quartal: quartalVal } },
			() => {
				this.resetExperteneinstieg();
			}
		);
	}

	disabledDate(current) {
		// .subtract(3, 'months'), weil immer vom aktuellen Quartal ausgegangen wird. D.h. April ist Q2, es darf aber nur bis Q1 berechnet werden
		let future = current > moment().endOf('day').subtract(3, 'months');
		let past = current < moment('20190331', 'YYYYMMDD').endOf('day');

		return future || past;
	}

	resetExperteneinstieg() {
		var feldMrp = document.getElementById('mrp');
		var feldZinssatz = document.getElementById('zinssatz');
		var feldDatepicker = document.getElementById('datepicker');

		if (feldMrp !== null) {
			feldMrp.value = parseFloat(this.state.factors.mrp.valueOf());
		}
		if (feldZinssatz != null) {
			feldZinssatz.value = parseFloat(this.state.factors.zinssatz);
		}
		if (feldDatepicker !== null) {
			feldDatepicker.value = this.state.factors.quartal;
		}
	}

	removeZinssatzValue() {
		document.getElementById('zinssatz').value = '';
	}

	removeMrpValue() {
		document.getElementById('mrp').value = '';
	}

	render() {
		return (
			<>
				<Accordion defaultActiveKey="0">
					<Card border="white">
						<Card.Header>
							<AccordionToggle
								as={Button}
								disabled={this.state.disableButtonLoading}
								data-toggle="collapse"
								onClick={this.resetExperteneinstieg}
								variant="link"
								eventKey="1"
							>
								Experteneinstieg
							</AccordionToggle>
						</Card.Header>
						<AccordionCollapse eventKey="1">
							<Card.Body>
								<FormGroup>
									Finanzdaten bis:
									<OverlayTrigger
										overlay={
											<Tooltip id="tooltip-disabled">
												Hier kann das Endquartal angegeben werden, bis zu
												welchem die Free Cash Flows in die Unternehmensbewertung
												einbezogen werden sollen.
											</Tooltip>
										}
									>
										<span className="d-inline-block">
											<InfoCircleOutlined className="tooltipIcon" />
										</span>
									</OverlayTrigger>
									<br />
									<div className="datepicker">
										<DatePicker
											id="datepicker"
											picker="quarter"
											size="large"
											placeholder="Quartal"
											disabledDate={this.disabledDate}
											defaultValue={moment('2019/12/31', 'YYYY/MM/DD')}
											format="YYYY-[Q]Q"
										/>
									</div>
									<hr />
									Risikofreier Zinssatz:
									<OverlayTrigger
										overlay={
											<Tooltip id="tooltip-disabled">
												Der risikofreie Zinssatz orientiert sich an den
												sichersten Anlagemöglichkeiten, welche auf dem Papier
												quasi risikofrei sind.
											</Tooltip>
										}
									>
										<span className="d-inline-block">
											<InfoCircleOutlined className="tooltipIcon" />
										</span>
									</OverlayTrigger>
									<div className="input-group mb-3">
										<input
											id="zinssatz"
											type="number"
											onFocus={this.removeZinssatzValue}
											className="form-control"
											placeholder={parseFloat(this.state.factors.zinssatz)}
											aria-label="Amount (to the nearest dollar)"
										/>
										<div className="input-group-append">
											<span className="input-group-text">%</span>
										</div>
									</div>
									<hr />
									Marktrisikoprämie:
									<OverlayTrigger
										overlay={
											<Tooltip id="tooltip-disabled">
												Die Marktrisikoprämie ergibt sich aus der Differenz der
												Risikoprämie, welche für eine bestimmte Anlageklasse
												fällig ist (bspw. Aktien, Anleihen, etc.) und dem
												risikofreien Zinssatz. Sie entspricht dem Erwartungswert
												der Rendite aus einem Marktportfolio, abzüglich des
												risikofreien Zinssatzes.
											</Tooltip>
										}
									>
										<span className="d-inline-block">
											<InfoCircleOutlined className="tooltipIcon" />
										</span>
									</OverlayTrigger>
									<div className="input-group mb-3">
										<input
											id="mrp"
											type="number"
											onFocus={this.removeMrpValue}
											className="form-control"
											placeholder={parseFloat(this.state.factors.mrp)}
											aria-label="Amount (to the nearest dollar)"
										/>
										<div className="input-group-append">
											<span className="input-group-text">%</span>
										</div>
									</div>
									<hr />
									<AccordionToggle
										as={Button}
										disabled={this.state.disableButtonLoading}
										data-toggle="collapse"
										type="submit"
										onClick={this.saveFactors}
										variant="danger"
										eventKey="1"
										block
									>
										Alles Übernehmen
									</AccordionToggle>
								</FormGroup>
							</Card.Body>
						</AccordionCollapse>
					</Card>
				</Accordion>
			</>
		);
	}
}
