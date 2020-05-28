import React from 'react';
import styled from 'styled-components';
import { Layout } from './components/Layout';
import { Jumbotron } from './components/Jumbotron';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import akitendiagramm from './assets/dhLogoImage.png';

const Styles = styled.div`
.buttonlink {
    color: white;
    text-decoration: none;
}

.left {
    margin-right: auto;
}
`;

export class Result extends React.Component {

    constructor(props) {
        super(props);

        this.unternehmen = "Adidas";
        this.methode = "Ertragswertverfahren";
        this.ergebnis = "?";
        this.entwicklung = "sehr gut";
        this.unternehmenswert = "?";
        this.bewertet = "unterbewertet";
        this.empfehlung = "kaufen";
    }

    render() {
        return (
            <Styles>
                <Jumbotron></Jumbotron>
                <Layout>
                    <div className="App-body">
                        <h1 className="left">... hier kommt das Ergebnis!</h1>
                        <p> Der Unternehmenswert von {this.unternehmen} wird mit der Methode {this.methode} zum {this.ergebnis} prognostiziert.</p>
                        <br />
                        <h1 className="left">Unternehmenswert: {this.unternehmenswert}</h1>
                        <p>Die Aktien von {this.unternehmen} scheinen sich bis jetzt {this.entwicklung} zu entwickeln. Die Aktie ist {this.bewertet}!</p>
                        <br />
                        <h1 className="left">Aktienkurs</h1>
                        <div className="left" id="bild">
                            <img src={akitendiagramm} className="aktiendiagramm" alt="Aktiendiagramm" />
                        </div>
                        <br />
                        <h1 className="left">Unsere Empfehlung: {this.empfehlung}</h1>
                        <br />
                        <Button variant="danger">
                            <Link className="buttonlink" to="/selection">Neue Berechung</Link>
                        </Button>
                    </div>
                </Layout>
            </Styles >
        )
    }
}
