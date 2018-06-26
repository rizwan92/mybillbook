import React, { Component } from "react";

export class ThirdRow extends Component {
  render() {
    return (
      <div className="firstbox">
        <div className="mdl-textfield mdl-js-textfield">
          <input
            className="mdl-textfield__input myinput"
            type="text"
            placeholder="GST Number"
            onChange={e =>
              this.props.changeUserInput(e.target.value, "GSTNumber")
            }
            value={this.props.GSTNumber}
          />
        </div>
        <h4>Total {this.props.total} </h4>
        <button
          onClick={() => this.props.clearAll()}
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          style={{ margin: 10 }}
        >
          Clear All
        </button>
      </div>
    );
  }
}

export default ThirdRow;
