import React, { Component } from "react";

export class ProductRow extends Component {
  render() {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">
          {this.props.product.name}
          {/* <input
            className="mdl-textfield__input "
            type="text"
            placeholder="Name"
            value={this.props.product.name}
          /> */}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {this.props.product.quantity}
          {/* <input
            className="mdl-textfield__input "
            type="number"
            placeholder="Quantity"
            value={this.props.product.quantity}
          /> */}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {this.props.product.price}
          {/* <input
            className="mdl-textfield__input "
            type="number"
            placeholder="Price"
            value={this.props.product.price}
          /> */}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {this.props.product.tax} %
          {/* <input
            className="mdl-textfield__input "
            type="number"
            placeholder="Tax"
            value={this.props.product.tax}
          /> */}
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          {this.props.product.amount}
          {/* <input
            className="mdl-textfield__input "
            type="number"
            placeholder="Amount"
            disabled
            value={this.props.product.amount}
          /> */}
        </td>
        <td style={{ textAlign: "center", cursor: "pointer", color: "red" }}>
          <i
            className="material-icons"
            onClick={() =>
              this.props.removeProduct(this.props.product.productId)
            }
          >
            clear
          </i>
        </td>
      </tr>
    );
  }
}

export default ProductRow;
