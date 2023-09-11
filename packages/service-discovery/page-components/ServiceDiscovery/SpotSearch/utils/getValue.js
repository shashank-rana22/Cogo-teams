import { COMMODITY_NAME_MAPPING } from '@cogoport/globalization/constants/commodities';
import { getByKey, isEmpty, startCase } from '@cogoport/utils';

import { CONTAINER_SIZE, CONTAINER_TYPE } from './container';

const ZERO_VALUE = 0;
const ONE_VALUE = 1;

const iterateSubKeys = (itemField, value) => {
	let val = value;
	if ((itemField.subKeys || []).length) {
		itemField.subKeys.forEach((subKey) => {
			val = (val || {})[subKey];
		});
	}
	return val;
};

const getValue = (
	itemData,
	itemField,
	emptyState,
	functions = {},
) => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return emptyState || '';
	}

	let val = getByKey(itemData, itemField?.key);
	val = iterateSubKeys(itemField, val);

	if (itemField?.func) {
		if (functions[itemField.func]) {
			val = functions[itemField.func](itemData, itemField);
		} else if (startCase[itemField.func]) {
			val = startCase[itemField.func](val);
		}
	}

	switch (itemField.type) {
		case 'commodity':
			return (
				(COMMODITY_NAME_MAPPING[val] || {}).name
				|| itemField.alternative_value
				|| 'All Commodities'
			);

		case 'shipping-line':
			return (val || {}).short_name || (val || {}).name;

		case 'price':
			return `${itemData.currency} ${(
				itemData[itemField.key || 'price'] || ZERO_VALUE
			).toLocaleString()}`;

		case 'bool':
			return val ? 'Yes' : 'No';

		case 'percent':
			return val ? `${val} %` : '-';

		case 'days':
			return val !== null || val !== undefined
				? `${val} ${
					val > ONE_VALUE ? itemField.suffix || 'days' : itemField.suffix || 'day '
				}`
				: null;

		case 'stops':
			return val !== null || val !== undefined
				? `${val} ${val > ONE_VALUE ? 'stops' : 'stop '}`
				: null;

		case 'container':
			return `${CONTAINER_SIZE[itemData[itemField.container_size_key]] || ''} ${
				CONTAINER_TYPE[itemData[itemField.container_type_key]] || ''
			}`;

		default:
			break;
	}
	return val === null || val === undefined ? null : val;
};

export default getValue;
