import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

function FormatAmountCurrency({ itemData }) {
	return (
		<div>
			{ formatAmount({
				amount   : itemData.totalValue,
				currency : itemData.currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 4,
				},
			})}
		</div>
	);
}

export default FormatAmountCurrency;
