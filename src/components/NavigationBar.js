import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';


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
`;

export const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg" bg="dark" className="navbar-dark">
            <Navbar.Brand href="/">SUMZ Unternehmensbewertung</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/About">Übersicht</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/Contact">Kontakt</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse >
        </Navbar >
    </Styles >
)