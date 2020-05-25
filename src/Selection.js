import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import styled from 'styled-components';
import { Layout } from './components/Layout';
import Button from 'react-bootstrap/Button';
import { Jumbotron } from './components/Jumbotron';
import { NavLink } from 'react-router-dom';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';

const Styles = styled.div`
.buttonlink {
    color: #222;
    text-decoration: none;
}

.active{
    background-color: #dc3545;
}

.dropdown{
    maxHeight: 28px;
}

`;

export class Selection extends React.Component {

    constructor(props) {
        super(props);

        this.currentId = 0;
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            actions: [{ id: "1", key: "1", name: "adidas" },
            { id: "2", key: "2", name: "Allianz" },
            { id: "3", key: "3", name: "BASF" },
            { id: "4", key: "4", name: "Bayer" },
            { id: "5", key: "5", name: "Beiersdorf" },
            { id: "6", key: "6", name: "BMW" },
            { id: "7", key: "7", name: "Continental" },
            { id: "8", key: "8", name: "Covestro" },
            { id: "9", key: "9", name: "Daimler" },
            { id: "10", key: "10", name: "Deutsche Bank" },
            { id: "11", key: "11", name: "Deutsche Börse" },
            { id: "12", key: "12", name: "Deutsche Post" },
            { id: "13", key: "13", name: "Deutsche Telekom" },
            { id: "14", key: "14", name: "E.ON" },
            { id: "15", key: "15", name: "Fresenius" },
            { id: "16", key: "16", name: "Fresenius Medical Card" },
            { id: "17", key: "17", name: "HeidelbergCement" },
            { id: "18", key: "18", name: "Henkel vz." },
            { id: "19", key: "19", name: "Infineon" },
            { id: "20", key: "20", name: "Linde" },
            { id: "21", key: "21", name: "Lufthansa" },
            { id: "22", key: "22", name: "Merck" },
            { id: "23", key: "23", name: "MTU Aero Engines" },
            { id: "24", key: "24", name: "Münchener Rückversicherungs-Gesellschaft" },
            { id: "25", key: "25", name: "RWE" },
            { id: "26", key: "26", name: "SAP" },
            { id: "27", key: "27", name: "Siemens" },
            { id: "28", key: "28", name: "Volkswagen (VW) vz." },
            { id: "29", key: "29", name: "Vonovia" },
            { id: "30", key: "30", name: "Wirecard" }],
            dropDownValue: 'Wähle ein Unternehmen...',
            dropdownOpen: false
        };
    }

    changeValue(e) {
        // active removen
        if (this.currentId !== 0) {
            var currentItem = document.getElementById(this.currentId);
            currentItem.classList.remove("active");
        }

        this.setState({ dropDownValue: e.currentTarget.textContent });
        let id = e.currentTarget.getAttribute("id");

        //neues Item mit active setzen
        var element = document.getElementById(id);
        element.classList.add("active");
        this.currentId = id;
    }

    render() {
        return (
            <Styles>
                <Jumbotron></Jumbotron>
                <Layout>
                    <div className="App-body">
                        30 DAX Unternehmen
                        <Dropdown alignRight>
                            <DropdownToggle variant="danger" id="dropdown-basic">
                                {this.state.dropDownValue}
                            </DropdownToggle>
                            <DropdownMenu modifiers={{
                                setMaxHeight: 200
                            }}>
                                {this.state.actions.map(e => {
                                    return <DropdownItem id={e.id} key={e.id} onClick={this.changeValue}>{e.name}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        <br></br>
                        <p>Methode der Berechnung</p>

                        <ButtonGroup vertical >
                            <Button variant="light">
                                <NavLink className="buttonlink" to="/result">Ertragswertverfahren</NavLink>
                            </Button>
                            <Button variant="light">
                                <NavLink className="buttonlink" to="/result">Discounted Cashflow-Verfahren</NavLink>
                            </Button>
                        </ButtonGroup>
                        {/*<br></br>
                 <Button className="Button-start" variant="danger">
                    <NavLink className="buttonlink" to="/result">Let's see!</NavLink>
                </Button> */}
                    </div>
                </Layout>
            </Styles>
        )
    }
}