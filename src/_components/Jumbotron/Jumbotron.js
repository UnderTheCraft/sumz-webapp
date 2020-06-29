import React from 'react';
import { Container, Jumbotron as Jumbo } from 'react-bootstrap';
import dhLogoImage from '../../_assets/dhLogoImage.png';
import './Jumbotron.css';

export const Jumbotron = () => (
	<Jumbo fluid className="jumbo">
		<img src={dhLogoImage} className="App-logo" alt="logo" />
		<div className="overlay"></div>
		<Container>
			<h1 className="headline">SUMZ@DHBW Web App!</h1>
			<p>Viel Spaß bei der Unternehmensbewertung.</p>
		</Container>
	</Jumbo>
);
