import React from 'react';
import {Navbar, Nav,NavDropdown, Image} from 'react-bootstrap'
import draftkings from '../assets/draftkings-navbar.jpg'
import fanduel from '../assets/fanduel-thumbnail.jpg'

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="sticky-top">
  <Navbar.Brand href="#home">Daily Fantasy Lineup</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="https://www.fanduel.com/" target="_blank"><Image src={fanduel} fluid /></Nav.Link>
      <Nav.Link href="https://www.draftkings.com/" target="_blank"><Image src={draftkings} fluid /></Nav.Link>
      <NavDropdown title="Research" id="basic-nav-dropdown" style={{marginTop: "15px"}}>
        <NavDropdown.Item href="https://www.espn.com/" target="_blank">ESPN</NavDropdown.Item>
        <NavDropdown.Item href="https://www.rotowire.com/" target="_blank">Rotowire</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    {/* {<Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>} */}
  </Navbar.Collapse>
</Navbar>
  );
}

export default Header;
