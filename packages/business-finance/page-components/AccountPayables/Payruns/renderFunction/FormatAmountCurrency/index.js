import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

function FormatAmountCurrency({ itemData = {} }) {
	const { totalValue, currency } = itemData;
	return (
		<div>
			{ formatAmount({
				amount  : totalValue,
				currency,
				options : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			})}
		</div>
	);
}

export default FormatAmountCurrency;
