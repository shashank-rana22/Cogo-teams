const DIVIDE_VALUE = 1;
const ZERO_VALUE = 0;

export const getDecimalValue = (num = 0, fixedValue = 2) => {
	if (num % DIVIDE_VALUE === ZERO_VALUE) {
		return Math.floor(num);
	}
	return (num || ZERO_VALUE)?.toFixed(fixedValue);
};
