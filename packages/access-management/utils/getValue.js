// import React from 'react';
import {
	isEmpty, getByKey, format, startCase,
} from '@cogoport/utils';

import iterateSubKeys from './iterate-object';

const getValue = (
	itemData,
	itemField,
	functions = {},
	emptyState,
) => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return emptyState || '';
	}

	let val = getByKey(itemData, itemField.key);

	val = iterateSubKeys(itemField, val);

	if (itemField.func) {
		if (functions[itemField.func]) {
			val = functions[itemField.func](itemData, itemField);
		} else if (startCase(itemField.func)) {
			val = startCase(itemField.func)(val);
		}
	}

	switch (itemField.type) {
		case 'datetime': {
			return val ? (
				format(val, itemField.formatType || 'dd MMM yy | hh:mm a')
			) : (
				<div className="core-date-dash">-</div>
			);
		}
		default:
			break;
	}
	return val === null || val === undefined ? null : val;
};

export default getValue;
