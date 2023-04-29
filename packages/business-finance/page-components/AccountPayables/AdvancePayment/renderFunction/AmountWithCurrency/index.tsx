import getPrice from '@cogoport/forms/utils/get-formatted-price';
import React from 'react';

interface ItemProps {
	payableAmount:number,
	currency:string,
}
interface PropsType {
	itemData:ItemProps,
}

function AmountWithCurrency({ itemData }:PropsType) {
	const { payableAmount, currency } = itemData || {};
	return (
		<div>
			{getPrice(payableAmount, currency)}
		</div>
	);
}

export default AmountWithCurrency;
