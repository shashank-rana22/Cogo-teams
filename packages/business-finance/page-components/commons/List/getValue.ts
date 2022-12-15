import getByKey from 'lodash/get';
import lodashIsEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';

const ACTIONS = {
	startCase,
};

const isEmpty = (input: any) => {
	if (input instanceof Date) {
		return false;
	}
	return lodashIsEmpty(input);
};

const iterateSubKeys = (itemField:any, value:any) => {
	let val = value;
	if ((itemField.subKeys || []).length) {
		itemField.subKeys.forEach((subKey:any) => {
			val = (val || {})[subKey];
		});
	}
	return val;
};

const getValue = (itemData:any, itemField:any, functions:any, emptyState:any) => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return emptyState || '';
	}

	let val = getByKey(itemData, itemField.key);

	val = iterateSubKeys(itemField, val);

	if (itemField.func) {
		if (functions[itemField.func]) {
			val = functions[itemField.func](itemData, itemField);
		} else if (ACTIONS[itemField.func as keyof typeof ACTIONS]) {
			val = ACTIONS[itemField.func as keyof typeof ACTIONS](val);
		}
	}
	return val === null || val === undefined ? null : val;
};

export default getValue;
