import React, { Component } from "react";
import "./invoice.css";
import InvoicePattern from "../home/Print";
export class Invoice extends Component {
  state = {
    invoice: []
  };
  componentDidMount = () => {
    const invoice = JSON.parse(localStorage.getItem("myInvoice"));
    if (invoice === null) {
      this.setState({ invoice: [] });
    } else {
      this.setState({ invoice });
    }
  };

  removeProduct = id => {
    const invoice = this.state.invoice;
    const localinvoice = JSON.parse(localStorage.getItem("myInvoice"));
    const removedInvoice = invoice.filter(inv => {
      return inv.invoiceId !== id;
    });
    const localRemovedInvoice = localinvoice.filter(inv => {
      return inv.invoiceId !== id;
    });
    localStorage.setItem("myInvoice", JSON.stringify(localRemovedInvoice));
    this.setState({ invoice: removedInvoice });
  };

  render() {
    let total = 0;
    let totalAmount = 0;
    if (this.state.invoice.length !== 0) {
      total = this.state.invoice.length;
      this.state.invoice.forEach(inv => {
        let thisInvoicetotal = inv.products.reduce((total, product) => {
          let price = parseFloat(total) + parseFloat(product.amount);
          return price.toFixed(2);
        }, 0);
        totalAmount = totalAmount + parseFloat(thisInvoicetotal);
      });
    }

    return (
      <div>
        <div className="firstbox">
          <h2>
            Total {total} of Amount {totalAmount.toFixed(2)}
          </h2>
        </div>
        <table
          className="mdl-data-table mdl-js-data-table  mdl-shadow--2dp"
          style={{ width: "100%", paddingTop: 20 }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Number</th>
              <th style={{ textAlign: "left" }}>Person Name</th>
              <th style={{ textAlign: "left" }}>Person Details</th>
              <th style={{ textAlign: "left" }}>Products</th>
              <th style={{ textAlign: "left" }}>Amount </th>
              <th style={{ textAlign: "center" }}>Remove </th>
              <th style={{ textAlign: "center" }}>View </th>
              <th style={{ textAlign: "center" }}>Print </th>
            </tr>
          </thead>
          <tbody>
            {this.state.invoice.map((invoice, i) => {
              const amount = invoice.products.reduce(
                (sum, product) => sum + product.amount,
                0
              );
              return (
                <tr key={i}>
                  <td className="mdl-data-table__cell--non-numeric">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="mdl-data-table__cell--non-numeric">
                    {invoice.personName === "" ? "unknown" : invoice.personName}
                  </td>
                  <td className="mdl-data-table__cell--non-numeric">
                    {invoice.personDetail === ""
                      ? "unknown"
                      : invoice.personDetail}
                  </td>
                  <td className="mdl-data-table__cell--non-numeric">
                    {invoice.products.length}
                  </td>
                  <td className="mdl-data-table__cell--non-numeric">
                    {amount}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      cursor: "pointer",
                      color: "red"
                    }}
                  >
                    <i
                      onClick={() => this.removeProduct(invoice.invoiceId)}
                      className="material-icons"
                    >
                      clear
                    </i>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      cursor: "pointer"
                    }}
                  >
                    <i
                      onClick={() => this.viewPDF(invoice)}
                      className="material-icons"
                    >
                      remove_red_eye
                    </i>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      cursor: "pointer"
                    }}
                  >
                    <i
                      onClick={() => this.createPDF(invoice)}
                      className="material-icons"
                    >
                      print
                    </i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  viewPDF = invoice => {
    invoice.pdf = false;
    var pdf = new window.jsPDF("p", "pt", "letter");
    pdf.canvas.height = 72 * 11;
    pdf.canvas.width = 72 * 8.5;
    pdf.fromHTML(InvoicePattern(invoice));
    let mywindow = window.open(
      "",
      "PDF",
      "height=650,width=900,top=100,left=150"
    );
    mywindow.document.write(InvoicePattern(invoice));
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
  };
  createPDF = invoice => {
    invoice.pdf = true;
    var pdf = new window.jsPDF("p", "pt", "letter");
    pdf.canvas.height = 72 * 11;
    pdf.canvas.width = 72 * 8.5;
    pdf.fromHTML(InvoicePattern(invoice));
    pdf.save("mybillbook-" + invoice.personName + "-" + invoice.invoiceNumber);
  };
}

export default Invoice;
