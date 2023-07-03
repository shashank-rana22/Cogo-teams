import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import { FunctionObjects, FieldType, GenericObject } from '../Interfaces';

import FieldPair from './RenderFunctions/FiledPair';

const getFormattedAmount = ({ amount, currency }) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 2,
	},
});

const commonFunctions = (functions: { functions?: FunctionObjects }) => {
	const newFunctions: any = {
		renderName: (itemData: GenericObject, field: FieldType) => (
			<div>{itemData[field.key]}</div>
		),
		renderFieldPair: (itemData, field) => (
			<FieldPair itemData={itemData} field={field} />
		),
		renderAmount: (itemData, field) => (
			<div>
				{getFormattedAmount({
					amount   : getByKey(itemData, field?.key),
					currency : getByKey(itemData, field?.currencyKey),
				})}
			</div>
		),
		...(functions || {}),
	};

	return newFunctions;
};

export default commonFunctions;
