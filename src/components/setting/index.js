import React, { Component } from "react";
import "../home/home.css";
import { withAlert } from "react-alert";
export class Setting extends Component {
  state = {
    shopAddress:
      localStorage.getItem("shopAddress") === null
        ? ""
        : localStorage.getItem("shopAddress"),
    shopContact:
      localStorage.getItem("shopContact") === null
        ? ""
        : localStorage.getItem("shopContact")
  };
  changeUserInput = (text, state) => {
    if (state === "shopAddress") {
      localStorage.setItem("shopAddress", text);
    }
    if (state === "shopContact") {
      localStorage.setItem("shopContact", text);
    }
    this.setState({ [state]: text });
  };

  saveDetails = state => {
    let text = this.state[state];
    if (state === "shopAddress") {
      localStorage.setItem("shopAddress", text);
    }
    if (state === "shopContact") {
      localStorage.setItem("shopContact", text);
    }
    this.props.alert.show("details saved ", { timeout: 2000, type: "SUCCESS" });
  };

  render() {
    return (
      <div>
        <center>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input myinput"
              type="text"
              placeholder="Shop Contact Number"
              onChange={e =>
                this.changeUserInput(e.target.value, "shopContact")
              }
              value={this.state.shopContact}
            />
          </div>
          <button
            onClick={() => this.saveDetails("shopContact")}
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            style={{ margin: 10 }}
          >
            Save
          </button>
        </center>
        <center>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input myinput"
              type="text"
              placeholder="Shop Address"
              onChange={e =>
                this.changeUserInput(e.target.value, "shopAddress")
              }
              value={this.state.shopAddress}
            />
          </div>
          <button
            onClick={() => this.saveDetails("shopAddress")}
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            style={{ margin: 10 }}
          >
            Save
          </button>
        </center>
      </div>
    );
  }
}

export default withAlert(Setting);
