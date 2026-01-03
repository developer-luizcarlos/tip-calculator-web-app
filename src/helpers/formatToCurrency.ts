export const formatToCurrency = (value: number) => {
	return new Intl.NumberFormat("US", {
		currency: "USD",
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		notation: "standard",
		style: "currency",
	}).format(value);
};
