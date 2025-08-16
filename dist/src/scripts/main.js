import Tip from "./classes/Tip.js";
const btnsPercentage = document.querySelectorAll(".btn--percentage");
const calculatorForm = document.querySelector(".calculator__form");
const inputBill = document.querySelector(".input--bill");
const inputPeople = document.querySelector(".input--people");
const inputPercentage = document.querySelector(".input--percentage");
const spanTipAmount = document.querySelector(".description__value--tip-amount");
const spanTipTotalPerson = document.querySelector(".description__value--total");
const tip = new Tip();
function displayTipInfo() {
    spanTipAmount.textContent = formatToCurrency(tip.getTipAmount);
    spanTipTotalPerson.textContent = formatToCurrency(tip.getTipPerPerson);
}
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
btnsPercentage.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-value");
        tip.setPercentage = parseFloat(value);
        displayTipInfo();
    });
});
calculatorForm.addEventListener("submit", (e) => e.preventDefault());
inputBill.addEventListener("focus", (e) => updateInputValueToNumericValue(e.target));
inputBill.addEventListener("blur", (e) => updateInputValueToCurrency(e.target));
inputBill.addEventListener("input", () => {
    const value = inputBill.value;
    tip.setBill = removeSpecialCharsFromNumericValue(value);
    displayTipInfo();
});
inputPeople.addEventListener("blur", (e) => {
    updateInputValueToNumericValue(e.target);
});
inputPeople.addEventListener("input", () => {
    const value = inputPeople.value;
    tip.setPeople = removeSpecialCharsFromNumericValue(value);
    displayTipInfo();
});
inputPercentage.addEventListener("blur", (e) => {
    updateInputValueToNumericValue(e.target);
});
inputPercentage.addEventListener("input", () => {
    const value = inputPercentage.value;
    tip.setPercentage = removeSpecialCharsFromNumericValue(value);
    displayTipInfo();
});
