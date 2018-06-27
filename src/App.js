import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import HomePage from "./pages/HomePage";
import InvoiceByID from "./components/invoice/InvoiceByID";

const options = {
  position: "bottom center",
  timeout: 5000,
  offset: "30px",
  transition: "scale"
};

class App extends Component {
  render() {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/setting" component={HomePage} />
          <Route exact path="/myinvoice" component={HomePage} />
          <Route exact path="/myinvoice/:id" component={InvoiceByID} />
          <Route component={NoMatch} />
        </Switch>
      </AlertProvider>
    );
  }
}

export default App;

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);
