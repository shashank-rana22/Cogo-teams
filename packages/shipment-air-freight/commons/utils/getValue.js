import {
	getByKey,
	isEmpty,
	startCase,
} from '@cogoport/utils';

const ACTIONS = {
	startCase,
};

const getValue = (itemData, itemField, functions, emptyState) => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return emptyState || '';
	}

	const { key, func } = itemField || {};

	let val = getByKey(itemData, key || '');

	if (func) {
		if (functions[func]) {
			val = functions[func](itemData, itemField);
		} else if (ACTIONS[func]) {
			val = ACTIONS[func](val);
		}
	}

	return val === null || val === undefined ? null : val;
};

export default getValue;
