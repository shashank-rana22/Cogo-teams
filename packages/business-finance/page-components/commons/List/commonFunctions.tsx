import { getByKey } from '@cogoport/utils';
import React from 'react';

import getFormattedAmount from '../../Settlement/commons/Utils/getFormattedAmount';
import { FunctionObjects, FieldType, GenericObject } from '../Interfaces/index';

import FieldPair from './RenderFunctions/FiledPair';

const commonFunctions = (functions :{ functions?:FunctionObjects }) => {
	const newFunctions:any = {
		renderName: (itemData: GenericObject, field: FieldType) => (
			<div>{itemData[field.key]}</div>
		),
		renderFieldPair: (itemData, field) => (
			<FieldPair itemData={itemData} field={field} />
		),
		renderAmount: (itemData, field) => (
			<div>{getFormattedAmount({ amount: getByKey(itemData, field?.key), currency: getByKey(itemData, field?.currencyKey) })}</div>
		),
		...(functions || {}),

	};

	return newFunctions;
};

export default commonFunctions;
