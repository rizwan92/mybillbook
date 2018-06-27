import React, { Component } from "react";
import "./invoicebyid.css";
export class InvoiceByID extends Component {
  state = {
    myinvoice: null
  };
  componentDidMount = () => {
    const invoice = JSON.parse(localStorage.getItem("myInvoice"));
    const myinvoice = invoice.find(
      inv => inv.invoiceId === this.props.match.params.id
    );
    this.setState({ myinvoice });
  };

  render() {
    if (this.state.myinvoice == null) {
      return null;
    }
    let {
      personDetail,
      personName,
      shopName,
      invoiceNumber,
      GSTNumber,
      shopAddress,
      shopContact
    } = this.state.myinvoice;
    let products = this.state.myinvoice.products;
    let total = products.reduce((total, product) => total + product.amount, 0);
    return (
      <div className="invoice-container">
        <div className="firstrow">
          <h2>{shopName}</h2>
          <h4>GST Number: -{GSTNumber}</h4>
        </div>
        <div className="firstrow">
          <h3>TO MR/MRS {personName}</h3>
          <h4>Invoice Number: -{invoiceNumber} </h4>
        </div>
        <div className="firstrow">
          <h4>Address or Number : {personDetail}</h4>
        </div>
        <table className="mytable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              return (
                <tr key={product.productId}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{product.tax}</td>
                  <td>{product.amount}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="4" className="totaltd">
                Total
              </td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
        <div className="lastrow">
          <h5>
            Shop Address :{" "}
            {shopAddress === undefined || null || ""
              ? "not Availabe"
              : shopAddress}
          </h5>
          <h5>
            Shop Contact Number :{" "}
            {shopContact === undefined || null || ""
              ? "not Availabe"
              : shopContact}
          </h5>
        </div>
      </div>
    );
  }
}

export default InvoiceByID;
