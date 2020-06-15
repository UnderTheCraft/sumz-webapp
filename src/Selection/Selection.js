import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React from 'react';
import {
	Accordion,
	AccordionCollapse,
	AccordionToggle,
	Button,
	ButtonGroup,
	Card,
	Dropdown,
	DropdownItem,
	FormGroup,
} from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import { Link } from 'react-router-dom';
import { Jumbotron } from '../_components/Jumbotron/Jumbotron';
import { Layout } from '../_components/Layout/Layout';
import './Selection.css';

export class Selection extends React.Component {
	constructor(props) {
		super(props);

		this.changeValue = this.changeValue.bind(this);
		this.saveFactors = this.saveFactors.bind(this);
		this.resetExperteneinstieg = this.resetExperteneinstieg.bind(this);

		this.disableButton = true;
		this.currentId = 0;

		this.state = {
			companies: [],
			methods: [],
			factors: { mrp: 0, zinssatz: 0, quartal: '' },
			dropDownValue: { company: 'Wähle ein Unternehmen ...', link: null },
			dropdownOpen: false,
		};
	}

	componentDidMount() {
		this.getCompanies();
		this.getMethods();
		this.getFactors();
	}

	getCompanies() {
		fetch('https://sumz-backend.herokuapp.com/companies').then((response) => {
			response.json().then((data) => {
				this.setState({ companies: data });
			});
		});
	}

	getMethods() {
		fetch('https://sumz-backend.herokuapp.com/methods').then((response) => {
			response.json().then((data) => {
				this.setState({ methods: data });
			});
		});
	}

	getFactors() {
		fetch('https://sumz-backend.herokuapp.com/getDefaultExpertValues').then(
			(response) => {
				response.json().then((data) => {
					console.log(data);
					this.setState({
						factors: {
							mrp: data.market_risk_premium,
							zinssatz: data.risk_free_interest,
							quartal: '2019-Q4',
						},
					});
				});
			}
		);
	}

	changeValue(e) {
		// active removen
		if (this.currentId !== 0) {
			var currentItem = document.getElementById(this.currentId);
			currentItem.classList.remove('active');
		}

		let id = e.currentTarget.getAttribute('id');
		this.setState({
			dropDownValue: { company: e.currentTarget.textContent, link: id },
		});

		//neues Item mit active setzen
		var element = document.getElementById(id);
		element.classList.add('active');
		this.currentId = id;

		// Button und Link freigeben
		if (this.currentId !== 0) {
			this.disableButton = false;
		}
	}

	handleClick = (e) => {
		if (this.disableButton) {
			e.preventDefault();
		}

		sessionStorage.setItem('unternehmen', this.state.dropDownValue.company);
		sessionStorage.setItem('methode', e.currentTarget.textContent);
		sessionStorage.setItem('link', this.state.dropDownValue.link);
	};

	searchDropdownItem() {
		var input, i, items;
		input = document.getElementById('searchInput').value.toUpperCase();
		items = document.getElementsByClassName('unternehmenItems');

		for (i = 0; i < items.length; i++) {
			var txtValue = items[i].textContent;

			//Anzeigen bei richtiger suche bzw. nicht anzeigen bei falscher suche
			if (txtValue.toUpperCase().indexOf(input) > -1) {
				items[i].style.display = 'block';
			} else {
				items[i].style.display = 'none';
			}
		}
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
		return current && current > moment().endOf('day').subtract(3, 'months');
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
				<Jumbotron></Jumbotron>
				<Layout>
					<div className="App-body">
						30 DAX Unternehmen
						<Dropdown id="dropdown" alignRight className="dropdown">
							<DropdownToggle variant="danger" id="dropdown-basic">
								{this.state.dropDownValue.company}
							</DropdownToggle>
							<DropdownMenu className="richtung">
								<h6 className="dropdown-header">
									<div className="input-group">
										<input
											className="form-control"
											type="text"
											placeholder="Suche..."
											id="searchInput"
											onKeyUp={this.searchDropdownItem}
										/>
									</div>
								</h6>
								<div className="dropdown-divider"></div>
								{this.state.companies.map((e) => {
									return (
										<DropdownItem
											className="unternehmenItems"
											id={e.short_name}
											key={e.short_name}
											onClick={this.changeValue}
										>
											{e.long_name}
										</DropdownItem>
									);
								})}
							</DropdownMenu>
						</Dropdown>
						<br />
						<Accordion defaultActiveKey="0">
							<Card border="white">
								<Card.Header>
									<AccordionToggle
										as={Button}
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
											<br />
											<div className="datepicker">
												<DatePicker
													id="datepicker"
													picker="quarter"
													size="large"
													placeholder="Quartal"
													disabledDate={this.disabledDate}
													defaultValue={moment('2019/12/13', 'YYYY/MM/DD')}
													format="YYYY-[Q]Q"
												/>
											</div>
											<hr />
											Risikofreier Zinssatz:
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
						<br />
						<p>Methode der Berechnung</p>
						<ButtonGroup vertical>
							{this.state.methods.map((e) => {
								return (
									<Button
										key={e.method}
										id={e.method}
										disabled={this.disableButton}
										variant="light"
									>
										<Link
											key={e.method}
											onClick={this.handleClick}
											className="buttonlinkBlack"
											to="/result"
										>
											{e.description}
										</Link>
									</Button>
								);
							})}
						</ButtonGroup>
						<br />
					</div>
				</Layout>
			</>
		);
	}
}
