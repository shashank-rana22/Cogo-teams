import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { convertCurrencyValue } from './dynamicValues';

function getTotalMarginSum({ editedMargins = {}, currency_conversion, rate }) {
	const combinedLineItems = Object.values(editedMargins || {}).reduce((acc, itm) => [...acc, ...itm], []);

	const totalAmount = combinedLineItems.reduce((acc, curr) => acc + convertCurrencyValue(
		curr?.value,
		curr?.currency,
		rate?.total_price_currency,
		currency_conversion,
	), 0);

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
