import React, { Component } from "react";
import { Greetings } from "aws-amplify-react";
import { NavBar, Nav, NavRight } from "aws-amplify-react";

export default class MyGreetings extends Greetings {
  constructor(props) {
    super(props);
  }
  render() {
    const authState = this.props.authState || this.state.authState;
    const signedIn = authState === "signedIn";

    const theme = this.props.theme;
    const greeting = signedIn
      ? this.userGreetings(theme)
      : this.noUserGreetings(theme);
    if (!greeting) {
      return null;
    }

    return (
      <NavBar>
        <Nav style={{ padding: "0.75rem 1.25rem" }}>
          <img
            alt=""
            className="sidebar-heading-img"
            src="/paylink-horizontallogo.jpg"
          />
          <NavRight
            style={{
              textAlign: "right",
              display: "inline-block",
              float: "right"
            }}
          >
            {greeting}
          </NavRight>
        </Nav>
      </NavBar>
    );
  }
}
