// import React from 'react';

import { getByKey, isEmpty, format } from '@cogoport/utils';

import { COMMODITY_NAME_MAPPING } from '../constants/commodities';

import ActionFunction from './actions';
import { CONTAINER_SIZE, CONTAINER_TYPE } from './container';
import iterateSubKeys from './iterate-object';

const getValue = (
	itemData,
	itemField,
	// eslint-disable-next-line no-unused-vars
	// isMobile = false,
	emptyState,
	functions = {},
) => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return emptyState || '';
	}

	let val = getByKey(itemData, itemField.key);
	val = iterateSubKeys(itemField, val);

	if (itemField.func) {
		if (functions[itemField.func]) {
			val = functions[itemField.func](itemData, itemField);
		} else if (ActionFunction[itemField.func]) {
			val = ActionFunction[itemField.func](val);
		}
	}

	switch (itemField.type) {
		case 'datetime': {
			return val ? (
				format(val, itemField.formatType || 'dd MMM yy | hh:mm a', {
					locale: 'enGb',
				})
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
				return `${format(itemData[itemField.startKey], 'PP', {
					locale: 'enGb',
				})} - ${format(itemData[itemField.endKey], 'PP', {
					locale: 'enGb',
				})}`;
			}
			if (itemField.subType === 'short-date') {
				return `${format(itemData[itemField.startKey], 'd MMM', {
					locale: 'enGb',
				})} - ${format(itemData[itemField.endKey], 'd MMM', {
					locale: 'enGb',
				})}`;
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
