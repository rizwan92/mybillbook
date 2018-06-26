import React, { Component } from "react";

export class SecondRow extends Component {
  render() {
    return (
      <div className="firstbox">
        <div className="mdl-textfield mdl-js-textfield">
          <input
            className="mdl-textfield__input myinput"
            type="text"
            placeholder="Person Name"
            onChange={e =>
              this.props.changeUserInput(e.target.value, "personName")
            }
            value={this.props.personName}
          />
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <input
            className="mdl-textfield__input myinput"
            type="text"
            placeholder="Person Number or Address"
            onChange={e =>
              this.props.changeUserInput(e.target.value, "personDetail")
            }
            value={this.props.personDetail}
          />
        </div>
      </div>
    );
  }
}

export default SecondRow;
