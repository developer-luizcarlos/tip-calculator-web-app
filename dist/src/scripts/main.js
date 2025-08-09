"use strict";
const inputBill = document.querySelector(".input--bill");
function formatToCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}
function isEmptyString(value) {
    return value.trim() === "";
}
function removeSpecialCharsFromNumericValue(value) {
    const pattern = /[^0-9\.]/gi;
    return parseFloat(value.replace(pattern, ""));
}
function updateInputValueToCurrency(input) {
    const value = input.value;
    if (!isEmptyString(value)) {
        const valueWithoutSpecialChars = removeSpecialCharsFromNumericValue(value);
        input.value = isNaN(valueWithoutSpecialChars)
            ? ""
            : formatToCurrency(valueWithoutSpecialChars);
    }
}
function updateInputValueToNumericValue(input) {
    const value = input.value;
    if (!isEmptyString(value)) {
        const numericValue = removeSpecialCharsFromNumericValue(value);
        input.value = isNaN(numericValue) ? "" : numericValue.toString();
    }
}
inputBill.addEventListener("focus", (e) => updateInputValueToNumericValue(e.target));
inputBill.addEventListener("blur", (e) => updateInputValueToCurrency(e.target));
