import React from 'react';
import styled from 'styled-components';
import { Jumbotron } from './components/Jumbotron';
import { Layout } from './components/Layout';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

const Styles = styled.div`

`;

export const Home = () => (
    <Styles>
        <Jumbotron></Jumbotron>
        <Layout>
            <div className="App-body">
                <p>
                    Diese Anwendung wird zur Berechung des Unternehmenswertes verwendet! Das Brown-Rozeff-Modell wird zur Prognose zukünftiger Casflows verwendet.
                    Die Daten der 30 Dax- Unternehmen sind im Backend dieser App gespeichert und werden je nach Eingabe des Benutzers herangezogen. Basierend auf der gewählten Methode wird der Unternehmenswert berechnet.
                    </p>
                <br></br>
                <Button className="Button-start" variant="danger">
                    <NavLink to="/about">Start</NavLink>
                </Button>
            </div>
        </Layout>
    </Styles>
)
