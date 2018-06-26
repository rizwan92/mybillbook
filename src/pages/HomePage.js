import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "../components/home";
import NavBar from "../components/home/NavBar";
import Invoice from "../components/invoice";
export class HomePage extends Component {
  state = {
    search: ""
  };

  render() {
    return (
      <div>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
              {/* <span className="mdl-layout-title">
                <img
                  src={"./mybillbook.png"}
                  alt={"billbook"}
                  style={{ width: 40, height: 40 }}
                />
              </span> */}
              <span className="mdl-layout-title">MyBillBook.com</span>

              <div className="mdl-layout-spacer" />

              <NavBar visible={true} />
            </div>
          </header>
          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">MyBillBook.com</span>
            <NavBar visible={false} />
          </div>
          <main className="mdl-layout__content" style={{ padding: 20 }}>
            <div className="page-content" />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/"}
              render={props => <Home {...props} search={this.state.search} />}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/myinvoice"}
              render={props => (
                <Invoice {...props} search={this.state.search} />
              )}
            />
          </main>
        </div>

        <div id="demo-toast-example" className="mdl-js-snackbar mdl-snackbar">
          <div className="mdl-snackbar__text" />
          <button className="mdl-snackbar__action" type="button" />
        </div>
      </div>
    );
  }
}

export default HomePage;
