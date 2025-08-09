const inputBill = document.querySelector<HTMLInputElement>(".input--bill");

function formatToCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
