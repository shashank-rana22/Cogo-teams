import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

export const getFormatAmount = (amount) => {
	const geo = getGeoConstants();
	const formattedAmount = 	 formatAmount({
		amount   : amount || 'N/A',
		currency : geo.country.currency.code,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});
	return formattedAmount;
};
