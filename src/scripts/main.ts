const calculatorForm =
  document.querySelector<HTMLFormElement>(".calculator__form");
const inputBill = document.querySelector<HTMLInputElement>(".input--bill");
const inputPeople = document.querySelector(".input--people");
const inputPercentage = document.querySelector(".input--percentage");

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
