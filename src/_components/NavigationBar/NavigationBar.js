import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './NavigationBar.css';

export class NavigationBar extends React.Component{

    render(){
        return(
            <Navbar expand="lg" bg="dark" className="navbar-dark">
                <Navbar.Brand href="/">SUMZ Unternehmensbewertung</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <NavLink className="navigationlink" to="/about">Übersicht</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="navigationlink" to="/contact">Kontakt</NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse >
            </Navbar >
        )
    }
}