import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getByKey } from '@cogoport/utils';
import React from 'react';

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

const commonFunctions = (functions) => {
	const newFunctions = {
		renderName: (itemData, field) => (
			<div>{itemData[field.key]}</div>
		),
		renderFieldPair: (itemData, field) => (
			<FieldPair itemData={itemData} field={field} />
		),
		renderAmount: (itemData, field) => (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<span>
					{getFormattedAmount({
						amount   : getByKey(itemData, field?.key),
						currency : getByKey(itemData, field?.currencyKey),
						symbol   : itemData?.objectCurrency,
					})}
				</span>
				<span>
					{field?.label === 'Payable' ? itemData?.advancedAmount
							&& `ATH: ${getFormattedAmount({
								amount   : getByKey(itemData, 'advancedAmount'),
								currency : getByKey(itemData, field?.currencyKey),
								symbol   : itemData?.objectCurrency,
							})}` : null}
				</span>
			</div>
		),
		renderDate: (itemData, field) => (
			<div>
				{formatDate({
					date       : getByKey(itemData, field?.key),
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</div>
		),
		...(functions || {}),
	};

	return newFunctions;
};

export default commonFunctions;
