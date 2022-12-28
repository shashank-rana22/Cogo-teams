import React from 'react';
import {
	getByKey, format, isEmpty, startCase,
} from '@cogoport/utils';

import { GenericObject, FunctionObjects, FieldType } from '../Interfaces/index';

const ACTIONS = {
	startCase,
};

type TypeObject = string | number | Date | GenericObject | React.FC ;

type EmptyState = string | number | Date | React.FC;

const getValue = (itemData:any, itemField:FieldType, functions:FunctionObjects, emptyState:EmptyState) => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return emptyState || '';
	}

	let val = getByKey(itemData, itemField.key);

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
