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

	let val = getByKey(itemData, itemField.key || '');

	if (itemField.func) {
		if (functions[itemField.func]) {
			val = functions[itemField.func](itemData, itemField);
		} else if (ACTIONS[itemField.func]) {
			val = ACTIONS[itemField.func](val);
		}
	}

	return val === null || val === undefined ? null : val;
};

export default getValue;
