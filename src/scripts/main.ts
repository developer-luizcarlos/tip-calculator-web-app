// Imports
import Tip from "./classes/Tip.js";

// DOM Elements
const btnsPercentage =
  document.querySelectorAll<HTMLButtonElement>(".btn--percentage");
const calculatorForm =
  document.querySelector<HTMLFormElement>(".calculator__form");
const inputBill = document.querySelector<HTMLInputElement>(".input--bill");
const inputPeople = document.querySelector<HTMLInputElement>(".input--people");
const inputWrapperBill = document.querySelector(".input-wrapper--bill");
const inputWrapperPeople = document.querySelector(".input-wrapper--people");
const inputPercentage =
  document.querySelector<HTMLInputElement>(".input--percentage");
const spanBillErrorMsg = document.querySelector(".error-msg--bill");
const spanPeopleErrorMsg = document.querySelector(".error-msg--people");
const spanPercentageErrorMsg = document.querySelector(".error-msg--percentage");
const spanTipAmount = document.querySelector(".description__value--tip-amount");
const spanTipTotalPerson = document.querySelector(".description__value--total");

// Variables
const tip = new Tip();

// Functions
function displayTipInfo() {
  spanTipAmount!.textContent = formatToCurrency(tip.getTipAmount);
  spanTipTotalPerson!.textContent = formatToCurrency(tip.getTipPerPerson);
}

function formatToCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function isBillValueValid() {
  return tip.getBill !== 0;
}

function isEmptyString(value: string) {
  return value.trim() === "";
}

function isPeopleValueValid() {
  return tip.getPeople !== 0 && tip.getPeople <= 10;
}

function isPercentageValueValid() {
  return tip.getPercentage !== 0 && tip.getPercentage <= 100;
}

function removeSpecialCharsFromNumericValue(value: string) {
  const pattern = /[^0-9\.]/gi;
  return parseFloat(value.replace(pattern, ""));
}

function resetCalculator() {
  tip.setBill = 0;
  tip.setPeople = 0;
  tip.setPercentage = 0;

  inputBill!.value = "";
  inputPeople!.value = "";
  inputPercentage!.value = "";

  inputBill!.classList.remove("input-wrapper--error");
  inputPeople!.classList.remove("input-wrapper--error");
  inputPercentage!.classList.remove("input-wrapper--error");

  spanBillErrorMsg!.classList.remove("error-msg--visible");
  spanPeopleErrorMsg!.classList.remove("error-msg--visible");
  spanPercentageErrorMsg!.classList.remove("error-msg--visible");
}

function toggleError(
  errorSpan: Element,
  condition: boolean,
  wrapperElement?: Element
) {
  if (wrapperElement) {
    wrapperElement.classList.toggle("input-wrapper--error", condition);
  }

  errorSpan.classList.toggle("error-msg--visible", condition);
}

function updateInputValueToCurrency(input: HTMLInputElement) {
  const value = input.value;
  if (!isEmptyString(value)) {
    const valueWithoutSpecialChars = removeSpecialCharsFromNumericValue(value);
    input.value = isNaN(valueWithoutSpecialChars)
      ? ""
      : formatToCurrency(valueWithoutSpecialChars);
  }
}

function updateInputValueToNumericValue(input: HTMLInputElement) {
  const value = input.value;
  if (!isEmptyString(value)) {
    const numericValue = removeSpecialCharsFromNumericValue(value);
    input.value = isNaN(numericValue) ? "" : numericValue.toString();
  }
}

// Functions/Events Applied
document.addEventListener("DOMContentLoaded", resetCalculator);

btnsPercentage!.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");
    tip.setPercentage = parseFloat(value!);
    displayTipInfo();
    inputPercentage!.value = "";

    toggleError(spanPercentageErrorMsg!, !isPercentageValueValid());
  });

  btn.addEventListener("focus", () =>
    toggleError(spanPercentageErrorMsg!, !isPercentageValueValid())
  );
});

calculatorForm!.addEventListener("submit", (e) => e.preventDefault());

inputBill!.addEventListener("focus", (e) => {
  updateInputValueToNumericValue(e.target as HTMLInputElement);
  toggleError(spanBillErrorMsg!, !isBillValueValid(), inputWrapperBill!);
});

inputBill!.addEventListener("blur", (e) =>
  updateInputValueToCurrency(e.target as HTMLInputElement)
);

inputBill!.addEventListener("input", () => {
  const value = inputBill!.value;
  tip.setBill = removeSpecialCharsFromNumericValue(value);
  displayTipInfo();

  toggleError(spanBillErrorMsg!, !isBillValueValid(), inputWrapperBill!);
});

inputPeople!.addEventListener("focus", () =>
  toggleError(spanPeopleErrorMsg!, !isPeopleValueValid(), inputWrapperPeople!)
);

inputPeople!.addEventListener("blur", (e) => {
  updateInputValueToNumericValue(e.target as HTMLInputElement);
});

inputPeople!.addEventListener("input", () => {
  const value = inputPeople!.value;
  tip.setPeople = removeSpecialCharsFromNumericValue(value);
  displayTipInfo();

  toggleError(spanPeopleErrorMsg!, !isPeopleValueValid(), inputWrapperPeople!);
});

inputPercentage!.addEventListener("focus", () =>
  toggleError(spanPercentageErrorMsg!, !isPercentageValueValid())
);

inputPercentage!.addEventListener("blur", (e) => {
  updateInputValueToNumericValue(e.target as HTMLInputElement);
});

inputPercentage!.addEventListener("input", () => {
  const value = inputPercentage!.value;
  tip.setPercentage = removeSpecialCharsFromNumericValue(value);
  displayTipInfo();

  toggleError(spanPercentageErrorMsg!, !isPercentageValueValid());
});
