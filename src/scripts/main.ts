import Tip from "./classes/Tip.js";

const btnsPercentage =
  document.querySelectorAll<HTMLButtonElement>(".btn--percentage");
const calculatorForm =
  document.querySelector<HTMLFormElement>(".calculator__form");
const inputBill = document.querySelector<HTMLInputElement>(".input--bill");
const inputPeople = document.querySelector(".input--people");
const inputPercentage =
  document.querySelector<HTMLInputElement>(".input--percentage");

const tip = new Tip();

function formatToCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function isEmptyString(value: string) {
  return value.trim() === "";
}

function removeSpecialCharsFromNumericValue(value: string) {
  const pattern = /[^0-9\.]/gi;
  return parseFloat(value.replace(pattern, ""));
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

btnsPercentage!.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");
    tip.setPercentage = parseFloat(value!);
  });
});

calculatorForm!.addEventListener("submit", (e) => e.preventDefault());

inputBill!.addEventListener("focus", (e) =>
  updateInputValueToNumericValue(e.target as HTMLInputElement)
);

inputBill!.addEventListener("blur", (e) =>
  updateInputValueToCurrency(e.target as HTMLInputElement)
);

inputPeople!.addEventListener("blur", (e) => {
  updateInputValueToNumericValue(e.target as HTMLInputElement);
});

inputPercentage!.addEventListener("blur", (e) => {
  updateInputValueToNumericValue(e.target as HTMLInputElement);
});

inputPercentage!.addEventListener("input", () => {
  const value = inputPercentage!.value;
  tip.setPercentage = removeSpecialCharsFromNumericValue(value);
});
