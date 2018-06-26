import React, { Component } from "react";
import uuid from "uuid-v4";
export class AddProduct extends Component {
  state = {
    name: "",
    quantity: "",
    price: "",
    tax: "",
    amount: 0
  };

  onChange = (text, id) => {
    let amount =
      this.state.amount === "" ? 0 : parseFloat(this.state.amount).toFixed(2);
    let quantity =
      this.state.quantity === ""
        ? 0
        : parseFloat(this.state.quantity).toFixed(2);
    let price =
      this.state.price === "" ? 0 : parseFloat(this.state.price).toFixed(2);
    let tax = this.state.tax === "" ? 0 : parseFloat(this.state.tax).toFixed(2);
    if (id === "price") {
      amount =
        parseFloat(quantity).toFixed(2) *
        parseFloat(text === "" ? 0 : text).toFixed(2);
      let textamount = (amount * parseFloat(tax)).toFixed(2) / 100;
      amount = amount - parseFloat(textamount).toFixed(2);
    }
    if (id === "quantity") {
      amount =
        parseFloat(price).toFixed(2) *
        parseFloat(text === "" ? 0 : text).toFixed(2);
      let textamount = (amount * parseFloat(tax)).toFixed(2) / 100;
      amount = amount - parseFloat(textamount).toFixed(2);
    }
    if (id === "tax") {
      amount = parseFloat(price).toFixed(2) * parseFloat(quantity).toFixed(2);
      let textamount =
        (amount * parseFloat(text === "" ? 0 : text)).toFixed(2) / 100;
      amount = amount - parseFloat(textamount).toFixed(2);
    }

    this.setState({ [id]: text, amount });
  };

  showSnackBar(msg) {
    var snackbarContainer = document.querySelector("#demo-toast-example");
    var data = { message: msg };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }
  onSubmit = event => {
    event.preventDefault();
    let name = this.state.name.trim();
    let quantity = this.state.quantity;
    let price = this.state.price;
    let tax = this.state.tax;
    let amount = this.state.amount;

    if (name === "") {
      this.showSnackBar("Please Enter Name");
      return;
    }
    if (quantity === "") {
      this.showSnackBar("Please Enter Quantity");
      return;
    }
    if (price === "") {
      this.showSnackBar("Please Enter Price");
      return;
    }
    if (tax === "") {
      tax = 0;
    }
    quantity = parseFloat(quantity).toFixed(2);
    price = parseFloat(price).toFixed(2);
    amount = parseFloat(amount).toFixed(2);
    const productId = uuid();
    const Product = { productId, name, quantity, price, tax, amount };
    this.props.addProduct(Product);
    this.setState({
      name: "",
      quantity: "",
      price: "",
      tax: "",
      amount: 0
    });
    this.props.closeModal();
  };
  render() {
    let amount = parseFloat(this.state.amount);
    return (
      <div>
        <center>
          <h4 style={{ margin: 0 }}>{amount.toFixed(2)} </h4>
          <form onSubmit={this.onSubmit}>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input myinput"
                type="text"
                placeholder="Product Name"
                value={this.state.name}
                onChange={e => this.onChange(e.target.value, e.target.id)}
                id="name"
              />
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input myinput"
                type="number"
                placeholder="Product Quantity"
                value={this.state.quantity}
                onChange={e => this.onChange(e.target.value, e.target.id)}
                id="quantity"
              />
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input myinput"
                type="number"
                placeholder="Product Price"
                value={this.state.price}
                onChange={e => this.onChange(e.target.value, e.target.id)}
                id="price"
              />
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                className="mdl-textfield__input myinput"
                type="number"
                placeholder="Product Tax"
                value={this.state.tax}
                onChange={e => this.onChange(e.target.value, e.target.id)}
                id="tax"
              />
            </div>
            <br />
            <button
              type="submit"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            >
              Add
            </button>
          </form>
        </center>
      </div>
    );
  }
}

export default AddProduct;
