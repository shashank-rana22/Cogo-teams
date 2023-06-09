import {
	getByKey, isEmpty, startCase,
} from '@cogoport/utils';

import OverflowCheck from './OverflowCheck';

const ACTIONS = {
	startCase,
};

const getValue = (
	itemData,
	itemField,
	functions,
	emptyState,
) => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return emptyState || '';
	}

	let val = getByKey(itemData, itemField.key || '');

	if (itemField.func) {
		if (functions[itemField.func]) {
			val = functions[itemField.func](itemData, itemField);
		} else if (ACTIONS[itemField.func]) {
			val = ACTIONS[itemField.func](val);
		} else {
			val = '-';
		}
	}

	return val ? OverflowCheck({ children: val }) : '-';
};

export default getValue;
