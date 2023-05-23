import getGeoConstants from '@cogoport/globalization/constants/geo';

import INVOICE_CURRENCY_MAPPINGS from '../../../../../../helpers/invoiceCurrencyMapping';

const geo = getGeoConstants();

const getCurrencyOptions = (invoice) => {
	const currencyOptionsOld =	INVOICE_CURRENCY_MAPPINGS?.freight_invoice_currency?.[
		invoice?.country_code || geo.country.code
	] || INVOICE_CURRENCY_MAPPINGS?.freight_invoice_currency?.others;

	const currencyOptions = currencyOptionsOld.map((item) => ({
		key      : item,
		disabled : false,
		children : item,
		suffix   : null,
		tooltip  : false,
	}));

	return { currencyOptions };
};

export default getCurrencyOptions;
