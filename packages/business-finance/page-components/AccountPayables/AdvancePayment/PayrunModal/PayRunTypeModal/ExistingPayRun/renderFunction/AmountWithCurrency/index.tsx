import getPrice from '@cogoport/forms/utils/get-formatted-price';
import React from 'react';

interface ItemTypes {
	currency:string;
	totalValue:number;
}
interface PropsType {
	itemData:ItemTypes,
}

function AmountWithCurrency({ itemData }:PropsType) {
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
