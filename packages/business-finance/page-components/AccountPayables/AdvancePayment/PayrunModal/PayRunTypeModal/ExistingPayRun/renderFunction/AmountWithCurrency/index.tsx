import getPrice from '@cogoport/forms/utils/get-formatted-price';
import React from 'react';

function AmountWithCurrency({ itemData }) {
	const { currency, totalValue } = itemData || {};
	return (
		<div>
			<div>

				Total value :
				{' '}
				{' '}
				{getPrice(totalValue, currency)}
				{/* ₹19,888,723.46 */}
			</div>
		</div>
	);
}

export default AmountWithCurrency;
