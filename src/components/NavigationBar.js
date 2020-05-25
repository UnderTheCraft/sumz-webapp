import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";

const Styles = styled.div`
.navbar {
    background-color: #222;

}

.navbar-brand, .navbar-nav, .nav-link {
    color: #bbb !important;

    &:hover{
        color: white !important;
    }
}

.navigationlink {
    color: #bbb;
    text-decoration: none;
    margin-right: 1rem;

    &:hover{
        color: white;
    }
}
`;

export const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg" bg="dark" className="navbar-dark">
            <Navbar.Brand href="/">SUMZ Unternehmensbewertung</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <NavLink className="navigationlink" to="/">Home</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="navigationlink" to="/about">Übersicht</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="navigationlink" to="/contact">Kontakt</NavLink>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse >
        </Navbar >
    </Styles >
)