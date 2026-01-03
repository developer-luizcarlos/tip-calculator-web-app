export const isValidPercentageFormat = (percentage: string): boolean => {
	return /^[0-9]{1,3}$/.test(percentage);
};
