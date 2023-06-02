import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { convertCurrencyValue } from './dynamicValues';

function getTotalMarginSum({ editedMargins = {}, currency_conversion, rate }) {
	let totalAmount = 0;

	let combinedLineItems = Object.values(editedMargins || {}).reduce((acc, itm) => [...acc, ...itm], []);

	combinedLineItems.forEach((itm) => {
		totalAmount += convertCurrencyValue(
			itm?.value,
			itm?.currency,
			rate?.total_price_currency,
			currency_conversion,
		);
	});

	const total_margin_by_kam = formatAmount({
		amount   : totalAmount,
		currency : rate?.total_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 0,
		},
	});
	return {
		total_margin_by_kam,
		totalAmount,
	};
}

export default getTotalMarginSum;
