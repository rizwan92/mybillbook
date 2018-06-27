const invoicePattern = ({
  invoiceId,
  shopName,
  invoiceNumber,
  personName,
  personDetail,
  GSTNumber,
  products,
  pdf,
  shopAddress,
  shopContact
}) => {
  let total = 0;
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <title>mybillbook-${personName}-${invoiceNumber}</title>
</head>
<style>
    .invoice-container {
        padding: 10px;
    }

    .firstrow {
        display: flex;
        justify-content: space-between;
    }

    .lastrow {
        display: flex;
        flex-direction: column;
        padding-top: 40px;
    }

    .lastrow h5 {
        margin: 0;
    }

    .mytable {
        width: 100%
    }

    th {
        text-align: center;
        padding:8px;
    }

    td {
        text-align: center;
        padding:8px;
    }
    .totaltd {
        text-align: right;font-size: 20px;
    }
</style>

<body>
    <div class="invoice-container">
        <div class="firstrow">
            <h2>${shopName}</h2>
            <h4>GST Number: -${GSTNumber}</h4>
        </div>
        <div class="firstrow">
            <h3>TO MR/MRS ${personName}</h3>
            <h4>Invoice Number: -${invoiceNumber} </h4>
        </div>
        <div class="firstrow">
            <h4>Address or Number : ${personDetail}</h4>
        </div>
        <table class="mytable">
            <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Tax</th>
            <th>Amount</th>
            </tr>
            ${products.map(product => {
              total = total + product.amount;
              return `<tr key={product.productId}>
                  <td>${product.name}</td>
                  <td>${product.quantity}</td>
                  <td>${product.price}</td>
                  <td>${product.tax}</td>
                  <td>${product.amount}</td>
                </tr>`;
            })}
            <tr>
            ${pdf ? `<td></td><td></td><td></td>` : ""}
                <td colspan="4" class=""totaltd">
                    Total
                </td>
                <td>
                ${total}
                </td>
            </tr>
        </table>
        <div class="lastrow">
            <h5>Shop Address :  ${
              shopAddress === undefined || null || ""
                ? "NOT AVAILABLE"
                : shopAddress
            }</h5>
            <h5>Shop Contact Number :  ${
              shopContact === undefined || null || ""
                ? "NOT AVAILABLE"
                : shopContact
            }</h5>
        </div>
    </div>

</body>

</html>
    `;
};

export default invoicePattern;
