import getPrice from '@cogoport/forms/utils/get-formatted-price';
import React from 'react';

function AmountWithCurrency({ itemData }) {
	return (
		<div>
			<div>

				Total value :
				{' '}
				{' '}
				{getPrice(itemData?.amount, 'INR')}
				{/* ₹19,888,723.46 */}
			</div>
		</div>
	);
}

export default AmountWithCurrency;
