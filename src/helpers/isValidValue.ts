const VALID_VALUE_REGEX = /^[0-9]+(?:\.[0-9]+)?$/;

export const isValidValue = (value: string): boolean => {
	return VALID_VALUE_REGEX.test(value);
};
