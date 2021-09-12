import { Component } from "react";
import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

interface ILogoutButtonPros extends WithAuth0Props {
  className?: string;
}
interface ILogoutButtonState {}

class LogoutButton extends Component<ILogoutButtonPros, ILogoutButtonState> {
  render() {
    return (
      <Button
        variant="link"
        onClick={() => {
          this.props.auth0.logout();
        }}
        className={this.props.className}
      >
        {this.props.children}
      </Button>
    );
  }
}

export default withAuth0(LogoutButton);
