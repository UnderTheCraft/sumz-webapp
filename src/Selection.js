import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import styled from 'styled-components';
import { Layout } from './components/Layout';
import Button from 'react-bootstrap/Button';
import { Jumbotron } from './components/Jumbotron';
import { Link } from 'react-router-dom';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';

const Styles = styled.div`
.buttonlink {
    color: #222;
    text-decoration: none;
}

.dropdown-menu {
    max-height: 25em;
    overflow: auto;
}

#dropdown-basic {
    min-width: 236px !important;
}

.dropdown-item.active, .dropdown-item:active {
    background-color: #dc3545;
}


@media (max-height: 900px) {
    .richtung{
        top: auto !important; 
        bottom: 0px !important;
        max-height: 15em !important; 
        transform: translate3d(0px, -40px, 0px) !important;
    
    }

    .dropdown-toggle::after {
        transform: rotate(180deg) !important;
    }
}
`;

export class Selection extends React.Component {

    constructor(props) {
        super(props);

        this.disableButton = true;
        this.currentId = 0;
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            actions:
                [{ id: "1", key: "1", name: "Adidas" },
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
                { id: "16", key: "16", name: "Fresenius Medical Care" },
                { id: "17", key: "17", name: "HeidelbergCement" },
                { id: "18", key: "18", name: "Henkel" },
                { id: "19", key: "19", name: "Infineon" },
                { id: "20", key: "20", name: "Linde" },
                { id: "21", key: "21", name: "Lufthansa" },
                { id: "22", key: "22", name: "Merck" },
                { id: "23", key: "23", name: "MTU Aero Engines" },
                { id: "24", key: "24", name: "Münchener Rück" },
                { id: "25", key: "25", name: "RWE" },
                { id: "26", key: "26", name: "SAP" },
                { id: "27", key: "27", name: "Siemens" },
                { id: "28", key: "28", name: "Volkswagen" },
                { id: "29", key: "29", name: "Vonovia" },
                { id: "30", key: "30", name: "Wirecard" }],
            dropDownValue: 'Wähle ein Unternehmen ...',
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

        // Button und Link freigeben
        if (this.currentId !== 0) {
            this.disableButton = false;
        }
    }

    handleClick = (e) => {
        if (this.disableButton) {
            e.preventDefault()
        }

        sessionStorage.setItem('unternehmen', this.state.dropDownValue);
        sessionStorage.setItem('methode', e.currentTarget.textContent);
    }

    searchDropdownItem() {
        var input, i, items;
        input = document.getElementById("searchInput").value.toUpperCase();
        items = document.getElementsByClassName("unternehmenItems");

        for (i = 0; i < items.length; i++) {
            var txtValue = items[i].textContent;

            //Anzeigen bei richtiger suche bzw. nicht anzeigen bei falscher suche
            if (txtValue.toUpperCase().indexOf(input) > -1) {
                items[i].style.display = "block";
            } else {
                items[i].style.display = "none";
            }
        }
    }

    render() {
        return (
            <Styles>
                <Jumbotron></Jumbotron>
                <Layout>
                    <div className="App-body">
                        30 DAX Unternehmen
                            <Dropdown id="dropdown" alignRight className="dropdown">
                            <DropdownToggle variant="danger" id="dropdown-basic">
                                {this.state.dropDownValue}
                            </DropdownToggle>
                            <DropdownMenu className="richtung">
                                <h6 className="dropdown-header">
                                    <div className="input-group">
                                        <input className="form-control" type="text" placeholder="Suche..." id="searchInput" onKeyUp={this.searchDropdownItem} />
                                    </div>
                                </h6>
                                <div className="dropdown-divider"></div>
                                {this.state.actions.map(e => {
                                    return <DropdownItem className="unternehmenItems" id={e.id} key={e.id} onClick={this.changeValue}>{e.name}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        <br />
                        <p>Methode der Berechnung</p>

                        <ButtonGroup vertical >
                            <Button id="ew" disabled={this.disableButton} variant="light">
                                <Link onClick={this.handleClick} className="buttonlink" to="/result">Ertragswertverfahren</Link>
                            </Button>
                            <Button id="dcf" disabled={this.disableButton} variant="light">
                                <Link onClick={this.handleClick} className="buttonlink" to="/result">Discounted Cashflow-Verfahren</Link>
                            </Button>
                        </ButtonGroup>
                    </div>
                </Layout>
            </Styles >
        )
    }
}