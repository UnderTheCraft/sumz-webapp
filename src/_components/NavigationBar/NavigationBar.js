import React from 'react';
import { Navbar } from 'react-bootstrap';
import './NavigationBar.css';

export class NavigationBar extends React.Component {
	render() {
		return (
			<Navbar expand="lg" bg="dark" className="navbar-dark">
				<Navbar.Brand href="/">SUMZ Unternehmensbewertung</Navbar.Brand>
			</Navbar>
		);
	}
}
