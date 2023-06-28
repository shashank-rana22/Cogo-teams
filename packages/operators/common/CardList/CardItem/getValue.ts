import {
	getByKey, isEmpty, startCase,
} from '@cogoport/utils';
import React, { ReactElement } from 'react';

import { GenericObject, FunctionObjects, FieldType } from '../Interfaces/index';

type TypeObject = string | number | Date | GenericObject | null | React.FC ;

type EmptyState = string | number | Date | React.FC;

type Value = Object | ReactElement<any, any> | null;

const getValue = (itemData:any, itemField:FieldType, functions:FunctionObjects, emptyState:EmptyState):TypeObject => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return emptyState || '';
	}

	let val:Value = getByKey(itemData, itemField.key || '');

	if (itemField.func) {
		if (functions[itemField.func]) {
			val = functions[itemField.func](itemData, itemField);
		} else if (itemField.func === 'startCase') {
			val = startCase(val);
		} else {
			val = '-';
		}
	}
	return val || '-';
};

export default getValue;
