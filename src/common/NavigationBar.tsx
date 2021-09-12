import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  BookHalf,
  Envelope,
  InfoCircle,
  PersonSquare,
} from "react-bootstrap-icons";
import LoginButton from "./LoginButton";
import "../styles/NavigationBar.css";

interface INavigationBarProps extends WithAuth0Props {}

interface INavigationBarState {}

class NavigationBar extends Component<
  INavigationBarProps,
  INavigationBarState
> {
  render() {
    return (
      <Navbar bg="primary" variant="light">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">
                <Envelope className="nav-icon" size={28} /> 站长信箱
              </Nav.Link>
              <Nav.Link href="/blog">
                <BookHalf className="nav-icon" size={28} /> 博客
              </Nav.Link>
              <Nav.Link href="/aboutme">
                <InfoCircle className="nav-icon" size={28} /> 关于我
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {!this.props.auth0.isAuthenticated && (
            <LoginButton>Signin</LoginButton>
          )}
          {this.props.auth0.isAuthenticated && (
            <div>
              <Nav.Link href="/userprofile" style={{ float: "right" }}>
                <PersonSquare size={28} /> {this.props.auth0.user?.nickname}
              </Nav.Link>
            </div>
          )}
        </Container>
      </Navbar>
    );
  }
}

export default withAuth0(NavigationBar);
