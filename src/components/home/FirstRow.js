import React, { Component } from "react";

export class FirstRow extends Component {
  render() {
    return (
      <div className="firstbox">
        <div className="mdl-textfield mdl-js-textfield">
          <input
            className="mdl-textfield__input myinput"
            type="text"
            placeholder="Your Shop Name"
            onChange={e =>
              this.props.changeUserInput(e.target.value, "shopName")
            }
            value={this.props.shopName}
          />
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <input
            className="mdl-textfield__input myinput"
            type="text"
            placeholder="Invoice Number"
            onChange={e =>
              this.props.changeUserInput(e.target.value, "invoiceNumber")
            }
            value={this.props.invoiceNumber}
          />
        </div>
      </div>
    );
  }
}

export default FirstRow;
