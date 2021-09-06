import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Sudo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/campus">主页</Nav.Link>
              <Nav.Link href="/askadmin">站长信箱</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
