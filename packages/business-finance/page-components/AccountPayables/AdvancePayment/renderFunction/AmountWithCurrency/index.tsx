import getPrice from '@cogoport/forms/utils/get-formatted-price';
import React from 'react';

function AmountWithCurrency({ itemData }) {
	const { payableAmount, currency } = itemData || {};
	return (
		<div>
			{getPrice(payableAmount, currency)}
		</div>
	);
}

export default AmountWithCurrency;
