import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import styled from 'styled-components';
import { Layout } from './components/Layout';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';


const Styles = styled.div`
.buttonlink {
    color: white;
    text-decoration: none;
}
`;

export const Selection = () => (
    <Styles>
        <Layout>
            <h1>SUMZ@DHBW Web App!</h1>
            <div className="App-body">
            <br></br>
                <p>
                    30 DAX Unternehmen
                </p>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Wähle ein Unternehmen...
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item >Adidas</Dropdown.Item>
                        <Dropdown.Item >Allianz</Dropdown.Item>
                        <Dropdown.Item >BASF</Dropdown.Item>
                        <Dropdown.Item >Bayer</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br></br>
                <p>
                    Methode der Berechnung
                    </p>
             
                    <ButtonGroup vertical >
                        <Button href="/result" variant="light">Ertragswertverfahren</Button>

                        <Button href="/result" variant="light">Discounted Cashflow-Verfahren</Button>
                    </ButtonGroup>
                   
              {/*<br></br>
                 <Button className="Button-start" variant="danger">
                    <NavLink className="buttonlink" to="/result">Let's see!</NavLink>
                </Button> */}
            </div>
        </Layout>
    </Styles>
);
