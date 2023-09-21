import flattenArray from './flattenArray';
import formatAmountValue from './formatAmountValue';

const getDyanmicLineItems = (lineItems) => {
	const flattenedLineItems = flattenArray(lineItems).map((childItem) => ({
		code  : childItem?.code,
		name  : childItem?.name,
		value : formatAmountValue(
			childItem?.total_price || '-',
			childItem?.currency,
		),
		serviceObj: childItem?.serviceObj || {},
	}));

	return flattenedLineItems;
};

export default getDyanmicLineItems;
