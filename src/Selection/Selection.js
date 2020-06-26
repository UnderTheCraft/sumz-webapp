import { LineChartOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownItem } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { Jumbotron } from '../_components/Jumbotron/Jumbotron';
import { Layout } from '../_components/Layout/Layout';
import { Experteneinstieg } from './Experteneinstieg/Experteneinstieg';
import './Selection.css';

export class Selection extends React.Component {
	constructor(props) {
		super(props);

		this.changeValue = this.changeValue.bind(this);

		this.disableButton = true;
		this.currentId = 0;

		this.state = {
			companies: [],
			methods: [],
			dropDownValue: { company: 'Wähle ein Unternehmen ...', link: null },
			dropdownOpen: false,
			disableButtonLoading: true,
		};
	}

	componentDidMount() {
		this.getCompanies();
		this.getMethods();
	}

	getCompanies() {
		fetch('https://sumz-backend.herokuapp.com/companies').then((response) => {
			response.json().then((data) => {
				this.setState({ companies: data }, () => {
					this.setState({ disableButtonLoading: false });
					document.getElementById('loading').style.display = 'none';
					document.getElementById('flaeche').style.webkitFilter = 'none';
				});
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

	disableLoading = (e) => {
		if (this.state.disableButtonLoading) {
			e.preventDefault();
		}
	};

	handleClick = (e) => {
		if (this.disableButton) {
			e.preventDefault();
		}

		sessionStorage.setItem('unternehmen', this.state.dropDownValue.company);
		sessionStorage.setItem('methode', e.currentTarget.textContent);
		sessionStorage.setItem('methodLink', e.currentTarget.id);
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
							Zu bewertendes Unternehmen
							<Dropdown id="dropdown" alignRight className="dropdown">
								<DropdownToggle
									variant="danger"
									id="dropdown-basic"
									disabled={this.state.disableButtonLoading}
								>
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
							<Experteneinstieg />
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
											className="selectionButton"
										>
											<Link
												key={e.method}
												id={e.method}
												onClick={this.handleClick}
												className="buttonlinkBlack"
												to="/result"
											>
												{e.description}
												<LineChartOutlined className="selectionIcon" />
											</Link>
										</Button>
									);
								})}
							</ButtonGroup>
							<br />
						</div>
					</div>
				</Layout>
			</>
		);
	}
}
