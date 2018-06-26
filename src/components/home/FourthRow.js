import React from "react";
const FourthRow = props => {
  return (
    <div className="secondbox">
      <button
        onClick={() => props.makeInvoice()}
        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        style={{ margin: 10 }}
      >
        Invoice
      </button>
    </div>
  );
};
export default FourthRow;
