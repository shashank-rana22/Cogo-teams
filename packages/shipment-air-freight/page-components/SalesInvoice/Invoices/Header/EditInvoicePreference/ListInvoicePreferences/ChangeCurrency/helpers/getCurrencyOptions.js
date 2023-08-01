import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getCurrencyOptions = (invoice) => {
	const geo = getGeoConstants();

	const currencyOptionsOld =	GLOBAL_CONSTANTS.options.freight_invoice_currency?.[
		invoice?.country_code || geo.country.code
	] || GLOBAL_CONSTANTS.options.freight_invoice_currency.OTHERS;

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
