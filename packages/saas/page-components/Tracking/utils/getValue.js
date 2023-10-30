import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, getByKey, startCase, format } from '@cogoport/utils';

const ActionFunction = {
	startCase,
};

const ZERO = 0;

const getValue = (itemData, itemField, functions, emptyState) => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return emptyState || '';
	}

	let val = getByKey(itemData, itemField.key);

	const iterateSubKeys = (itemFields, value) => {
		let vals = value;
		if ((itemFields.subKeys || []).length) {
			itemFields.subKeys.forEach((subKey) => {
				vals = (vals || {})[subKey];
			});
		}
		return vals;
	};

	val = iterateSubKeys(itemField, val);

	if (itemField.func) {
		if (functions[itemField.func]) {
			val = functions[itemField.func](itemData, itemField);
		} else if (ActionFunction[itemField.func]) {
			val = ActionFunction[itemField.func](val);
		}
	}

	switch (itemField.type) {
		case 'datetime':
			return val
				? format(val, itemField.formatType || GLOBAL_CONSTANTS.formats.date['dd MMM yy | hh:mm a'])
				: null;

		case 'price':
			return `${itemData.currency} ${(
				itemData[itemField.key || 'price'] || ZERO
			).toLocaleString()}`;

		case 'bool':
			return val ? 'Yes' : 'No';

		case 'percent':
			return val ? `${val} %` : '-';

		default:
			break;
	}
	return val === null || val === undefined ? null : val;
};

export default getValue;
