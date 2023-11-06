function calcChange({
	currVal = 0,
	prevVal = 0,
	valueKey = '',
	currentData = {},
	previousData = {},
}) {
	let currentValue = currVal;
	let previousValue = prevVal;

	if (valueKey) {
		currentValue = currentData?.[valueKey] || 0;
		previousValue = previousData?.[valueKey] || 0;
	}

	if (previousValue === 0) {
		return 'initial';
	}

	return (((currentValue - previousValue) / previousValue) * 100).toFixed(2) || 0;
}

export default calcChange;
