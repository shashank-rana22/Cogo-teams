import React from 'react';

import { GenericObject, FunctionObjects, FieldType } from './Interfaces/index';

const startCase=(arg:string):string=>{
	return arg.replace(/_/g," ")
}

const ACTIONS = {
	startCase,
};

type TypeObject = string | number | Date | GenericObject | React.FC ;

type EmptyState = string | number | Date | React.FC;

const isEmpty = (input: TypeObject) => {
	if (input instanceof Date) {
		return false;
	}
	return Object.keys(input).length === 0||(input as string).length==0;
};

const getValue = (itemData:any, itemField:FieldType, newFunctions:FunctionObjects, emptyState:EmptyState) => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return emptyState || '';
	}

	let val = itemData[itemField.key];

	if (itemField.func) {
		if (newFunctions[itemField.func]) {
			val = newFunctions[itemField.func](itemData, itemField);
		} else if (ACTIONS[itemField.func as keyof typeof ACTIONS]) {
			val = ACTIONS[itemField.func as keyof typeof ACTIONS](val);
		}
	}
	return val === null || val === undefined ? null : val;
};

export default getValue;
