import React from 'react';
import { Layout } from '../_components/Layout/Layout';
import '../App.css';
import { Jumbotron } from '../_components/Jumbotron/Jumbotron';
import APV from './APV';

export const About = () => (
	<div>
		<Jumbotron></Jumbotron>
		<Layout>
			<APV></APV>
		</Layout>
	</div>
);
