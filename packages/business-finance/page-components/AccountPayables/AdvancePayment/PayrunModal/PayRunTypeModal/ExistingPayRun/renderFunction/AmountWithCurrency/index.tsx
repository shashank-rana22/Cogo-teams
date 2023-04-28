import getPrice from '@cogoport/forms/utils/get-formatted-price';
import React from 'react';

function AmountWithCurrency({ itemData }) {
	const { currency, totalValue } = itemData || {};
	return (
		<div>
			Total value :
			{' '}
			{' '}
			{getPrice(totalValue, currency)}
		</div>
	);
}

export default AmountWithCurrency;
