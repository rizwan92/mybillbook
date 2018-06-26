import React, { Component } from "react";
import "./home.css";
import uuid from "uuid-v4";
import ProductRow from "./ProductRow";
import FirstRow from "./FirstRow";
import SecondRow from "./SecondRow";
import Modal from "../Modal";
import AddProduct from "./AddProduct";
import ThirdRow from "./ThirdRow";
import FourthRow from "./FourthRow";
import { withAlert } from "react-alert";
import InvoicePattern from "./Print";
export class Home extends Component {
  state = {
    isModalOpen: false,
    products: [],
    shopName:
      localStorage.getItem("shopName") === null
        ? ""
        : localStorage.getItem("shopName"),
    invoiceNumber:
      localStorage.getItem("invoiceNumber") === null
        ? "00001"
        : localStorage.getItem("invoiceNumber"),
    personName: "",
    personDetail: "",
    GSTNumber:
      localStorage.getItem("GSTNumber") === null
        ? ""
        : localStorage.getItem("GSTNumber")
  };

  componentDidMount = () => {
    const products = JSON.parse(localStorage.getItem("myProducts"));
    if (products === null) {
      return;
    }
    if (products.length === 0) {
      // do nothing
    } else {
      this.setState({ products });
    }
  };

  render() {
    let total = 0;
    if (this.state.products.length === 0) {
      total = this.state.products.reduce((sum, product) => {
        let totalSum = parseFloat(sum) + parseFloat(product.amount);
        return totalSum.toFixed(2);
      }, 0);
    }
    return (
      <div>
        <FirstRow
          changeUserInput={this.changeUserInput}
          shopName={this.state.shopName}
          invoiceNumber={this.state.invoiceNumber}
        />
        <SecondRow
          changeUserInput={this.changeUserInput}
          personName={this.state.personName}
          personDetail={this.state.personDetail}
        />
        <ThirdRow
          clearAll={this.clearAll}
          GSTNumber={this.state.GSTNumber}
          changeUserInput={this.changeUserInput}
          total={total}
        />
        <table
          className="mdl-data-table mdl-js-data-table  mdl-shadow--2dp"
          style={{ width: "100%", paddingTop: 20 }}
          id="myprint"
        >
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-numeric">
                Product Name
              </th>
              <th style={{ textAlign: "left" }}>Quantity</th>
              <th style={{ textAlign: "left" }}>Unit price</th>
              <th style={{ textAlign: "left" }}>TAX</th>
              <th style={{ textAlign: "left" }}>Amount </th>
              <th style={{ textAlign: "center" }}>Remove </th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, i) => {
              return (
                <ProductRow
                  key={i}
                  product={product}
                  removeProduct={this.removeProduct}
                />
              );
            })}
          </tbody>
        </table>

        <FourthRow makeInvoice={this.makeInvoice} />

        <button
          onClick={() => this.openModal()}
          className=" useraddbutton mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
        >
          <i className="material-icons">add</i>
        </button>
        <Modal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          style={modalStyle}
        >
          <i
            onClick={() => this.closeModal()}
            style={{ fontSize: 30, textAlign: "right", color: "red" }}
            className="material-icons"
          >
            clear
          </i>
          <AddProduct
            addProduct={this.addProduct}
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    );
  }

  makeInvoice = () => {
    let myInvoice = JSON.parse(localStorage.getItem("myInvoice"));
    let shopName = this.state.shopName.trim();
    let invoiceNumber = this.state.invoiceNumber.trim();
    let personName = this.state.personName.trim();
    let personDetail = this.state.personDetail.trim();
    let GSTNumber = this.state.GSTNumber.trim();
    let products = this.state.products;
    let invoiceId = uuid();

    if (shopName === "") {
      this.props.alert.show("Enter Shop Name", {
        timeout: 2000,
        type: "INFO"
      });
      return;
    }
    if (personName === "") {
      this.props.alert.show("Enter Customer Name", {
        timeout: 2000,
        type: "INFO"
      });
      return;
    }
    if (invoiceNumber === "") {
      this.props.alert.show("Enter Invoice Number", {
        timeout: 2000,
        type: "INFO"
      });
      return;
    }

    if (products.length === 0) {
      this.props.alert.show("Enter Some Products", {
        timeout: 2000,
        type: "INFO"
      });
      return;
    }

    const invoice = {
      invoiceId,
      shopName,
      invoiceNumber,
      personName,
      personDetail,
      GSTNumber,
      products
    };
    if (myInvoice === null) {
      const newInvoice = [];
      newInvoice.push(invoice);
      localStorage.setItem("myInvoice", JSON.stringify(newInvoice));
    } else {
      if (invoiceNumber === myInvoice[myInvoice.length - 1].invoiceNumber) {
        this.props.alert.show("Invoice number is same please change", {
          timeout: 2000,
          type: "INFO"
        });
        return;
      }
      myInvoice.push(invoice);
      localStorage.setItem("myInvoice", JSON.stringify(myInvoice));
    }
    this.props.alert.show("Invoice Created Successfully", {
      timeout: 2000,
      type: "SUCCESS"
    });
    let mywindow = window.open(
      "",
      "PRINT",
      "height=650,width=900,top=100,left=150"
    );

    mywindow.document.write(InvoicePattern(invoice));
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    this.clearAll();
  };

  addProduct = product => {
    const products = this.state.products;
    products.push(product);
    this.setState({ products }, () => {
      localStorage.setItem("myProducts", JSON.stringify(products));
    });
  };

  removeProduct = id => {
    const products = this.state.products;
    const localproducts = JSON.parse(localStorage.getItem("myProducts"));
    const removedProducts = products.filter(product => {
      return product.productId !== id;
    });
    const localRemovedProducts = localproducts.filter(product => {
      return product.productId !== id;
    });
    localStorage.setItem("myProducts", JSON.stringify(localRemovedProducts));
    this.setState({ products: removedProducts });
  };

  clearAll = () => {
    localStorage.setItem("myProducts", JSON.stringify([]));
    this.setState({ products: [] });
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  changeUserInput = (text, state) => {
    if (state === "shopName") {
      localStorage.setItem("shopName", text);
    }
    if (state === "invoiceNumber") {
      localStorage.setItem("invoiceNumber", text);
    }
    if (state === "GSTNumber") {
      localStorage.setItem("GSTNumber", text);
    }
    this.setState({ [state]: text });
  };
}

export default withAlert(Home);

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0,0.5)"
  }
};
