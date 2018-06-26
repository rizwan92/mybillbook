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
        <NavLink
          className="mdl-navigation__link"
          to={process.env.PUBLIC_URL + "/"}
        >
          Home
        </NavLink>
        <NavLink
          className="mdl-navigation__link"
          to={process.env.PUBLIC_URL + "/myinvoice"}
        >
          My Invoice
        </NavLink>
      </nav>
    );
  }
}

export default NavBar;
