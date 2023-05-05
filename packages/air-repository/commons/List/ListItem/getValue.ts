import {
	getByKey, isEmpty, startCase,
} from '@cogoport/utils';
import React, { ReactElement } from 'react';

import { NestedObj, FunctionObjects, FieldType } from '../Interfaces/index';

const ACTIONS = {
	startCase,
};

type TypeObject = string | number | Date | null | React.FC ;

type EmptyState = string | number | Date | React.FC;

type Value = Object | ReactElement | null;

const getValue = (
	itemData:NestedObj,
	itemField:FieldType,
	functions:FunctionObjects,
	emptyState:EmptyState,
):TypeObject => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return emptyState || '';
	}

	let val:Value = getByKey(itemData, itemField.key || '');

	if (itemField.func) {
		if (functions[itemField.func]) {
			val = functions[itemField.func](itemData, itemField);
		} else if (ACTIONS[itemField.func as keyof typeof ACTIONS]) {
			val = ACTIONS[itemField.func as keyof typeof ACTIONS](val as string);
		}
	}
	return val === null || val === undefined ? '-' : val;
};

export default getValue;
