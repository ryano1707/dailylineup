import React from 'react';
import {Navbar} from 'react-bootstrap'

function Footer() {
  return (
  <Navbar bg="light" expand="md">
  <Navbar.Brand href="#home">Future JCL Champion - Ryan Roethle</Navbar.Brand>
  <div>
  <a
            className="App-link float-right"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          </div>
  {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="https://www.fanduel.com/" target="_blank"><Image src={fanduel} fluid /></Nav.Link>
      <Nav.Link href="https://www.draftkings.com/" target="_blank"><Image src={draftkings} fluid /></Nav.Link>
      <NavDropdown title="Research" id="basic-nav-dropdown" style={{marginTop: "15px"}}>
        <NavDropdown.Item href="https://www.espn.com/" target="_blank">ESPN</NavDropdown.Item>
        <NavDropdown.Item href="https://www.rotowire.com/" target="_blank">Rotowire</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse> */}
</Navbar>
  );
}

export default Footer;
