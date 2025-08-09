const inputBill = document.querySelector<HTMLInputElement>(".input--bill");

function formatToCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function removeSpecialCharsFromNumericValue(value: string) {
  const pattern = /[^0-9\.]/gi;
  return parseFloat(value.replace(pattern, ""));
}
