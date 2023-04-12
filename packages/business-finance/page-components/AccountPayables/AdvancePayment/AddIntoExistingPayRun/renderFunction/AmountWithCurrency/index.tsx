import getPrice from '@cogoport/forms/utils/get-formatted-price';
import React from 'react';

function AmountWithCurrency({ itemData }) {
	return (
		<div>
			{getPrice(itemData?.advancedAmount, 'INR')}
		</div>
	);
}

export default AmountWithCurrency;
