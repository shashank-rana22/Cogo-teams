import { isEmpty } from '@cogoport/utils';

function calcChange({
	currVal = '',
	prevVal = '',
	valueKey = '',
	currentData = {},
	previousData = {},
}) {
	if (isEmpty(previousData) && isEmpty(prevVal)) {
		return 'initial';
	}

	let currentValue = +(currVal || 0);
	let previousValue = +(prevVal || 0);

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
