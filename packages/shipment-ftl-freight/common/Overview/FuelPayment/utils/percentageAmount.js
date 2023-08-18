const DECIMAL_PRECISION_UPTO = 2;
const MAX_PERCENTAGE = 100;

export const percentageAmount = (percentValue, amountValue) => {
	if (typeof percentValue !== 'number' || typeof amountValue !== 'number') {
		return null;
	}
	const amount = (percentValue * amountValue) / MAX_PERCENTAGE;
	const roundOff = amount.toFixed(DECIMAL_PRECISION_UPTO);
	return +roundOff;
};
