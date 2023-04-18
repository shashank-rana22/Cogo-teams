import getPrice from '@cogoport/forms/utils/get-formatted-price';
import React from 'react';

function AmountWithCurrency({ itemData }) {
	const { advanceAmount, currency } = itemData || {};
	return (
		<div>
			{getPrice(advanceAmount, currency)}
		</div>
	);
}

export default AmountWithCurrency;
