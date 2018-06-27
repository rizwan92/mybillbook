import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class NavBar extends Component {
  render() {
    return (
      <nav
        className={`mdl-navigation mdl-layout${
          this.props.visible ? "--large-screen-only" : " "
        }`}
      >
        <NavLink className="mdl-navigation__link" to="/">
          Home
        </NavLink>
        <NavLink className="mdl-navigation__link" to="/myinvoice">
          My Invoice
        </NavLink>
        <NavLink className="mdl-navigation__link" to="/setting">
          Settings
        </NavLink>
      </nav>
    );
  }
}

export default NavBar;
