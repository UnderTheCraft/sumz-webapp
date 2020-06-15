import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import dhImage from '../../_assets/dhImage.jpg'
import dhLogoImage from '../../_assets/dhLogoImage.png';

const Styles = styled.div`
.jumbo{
    background: url(${dhImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    left: 0px;
    position: relative;
    z-index: -2;
}

.overlay {
    background-color: #000;
    opacity: 0.6; 
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
}

@media (prefers-reduced-motion: no-preference) {
    .App-logo {
      /*animation: App-logo-spin infinite 20s linear;*/
      position: absolute;
      top: 0px;
      left: 0px;
      max-width: 40%;
      height: auto; 
      min-height: 200px !important
    }
  }

h1{
    color: white;
}

@media (max-width: 1920px) {
    .App-logo {
        display: none !important;
    }
}
`;

export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className="jumbo">
            <img src={dhLogoImage} className="App-logo" alt="logo" />
            <div className="overlay"></div>
            <Container>
                <h1>SUMZ@DHBW Web App!</h1>
                <p>Viel Spaß bei der Unternehmensbewertung.</p>
            </Container>
        </Jumbo>
    </Styles>
)



