import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

const getFormattedAmount = (amount, currency) => (
	<div>
		{formatAmount({
			amount  : amount || 0,
			currency,
			options : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 2,
			},
		})}

	</div>
);

export default getFormattedAmount;
