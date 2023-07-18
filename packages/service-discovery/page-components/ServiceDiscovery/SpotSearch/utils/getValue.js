import { COMMODITY_NAME_MAPPING } from '@cogoport/globalization/constants/commodities';
import { getByKey, isEmpty, startCase } from '@cogoport/utils';

import { CONTAINER_SIZE, CONTAINER_TYPE } from './container';
import formatDateToString from './formatDateToString';

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
		case 'datetime': {
			return val ? (
				formatDateToString(val, itemField.formatType || 'dd MMM yy | hh:mm a')
			) : (
				<div className="core-date-dash">-</div>
			);
		}
		case 'commodity':
			return (
				(COMMODITY_NAME_MAPPING[val] || {}).name
				|| itemField.alternative_value
				|| 'All Commodities'
			);

		case 'shipping-line':
			// return <ShippingLine name={val.short_name} logo={val.logo} isMobile={isMobile} />;
			return (val || {}).short_name || (val || {}).name;

		case 'range':
			if (itemField.subType === 'date') {
				return `${formatDateToString(itemData[itemField.startKey], 'PP')} 
				- ${formatDateToString(itemData[itemField.endKey], 'PP')}`;
			}
			if (itemField.subType === 'short-date') {
				return `${formatDateToString(itemData[itemField.startKey], 'd MMM')} 
				- ${formatDateToString(itemData[itemField.endKey], 'd MMM')}`;
			}
			return `${itemData[itemField.startKey]} - ${itemData[itemField.endKey]}`;

		case 'price':
			return `${itemData.currency} ${(
				itemData[itemField.key || 'price'] || 0
			).toLocaleString()}`;

		case 'bool':
			return val ? 'Yes' : 'No';

		case 'percent':
			return val ? `${val} %` : '-';

		case 'days':
			return val !== null || val !== undefined
				? `${val} ${
					val > 1 ? itemField.suffix || 'days' : itemField.suffix || 'day '
				}`
				: null;

		case 'stops':
			return val !== null || val !== undefined
				? `${val} ${val > 1 ? 'stops' : 'stop '}`
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
