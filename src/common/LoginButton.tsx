import { Component } from "react";
import { withAuth0, WithAuth0Props } from '@auth0/auth0-react';
import { Button } from "react-bootstrap";

interface ILoginButtonPros extends WithAuth0Props {}
interface ILoginButtonState {}

class LoginButton extends Component<ILoginButtonPros, ILoginButtonState> {
  render() {
    return (
      <Button
        variant="link"
        onClick={() => {
          this.props.auth0.loginWithRedirect();
        }}
      >
        请先登陆
      </Button>
    );
  }
}

export default withAuth0(LoginButton);
