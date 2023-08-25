const DIVIDE_VALUE = 1;
const ZERO_VALUE = 0;
const TO_FIXED_VALUE = 2;

export const getDecimalValue = (num = 0) => {
	if (num % DIVIDE_VALUE === ZERO_VALUE) {
		return Math.floor(num);
	}
	return (num || ZERO_VALUE)?.toFixed(TO_FIXED_VALUE);
};
