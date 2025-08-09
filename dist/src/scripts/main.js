"use strict";
const inputBill = document.querySelector(".input--bill");
function formatToCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}
