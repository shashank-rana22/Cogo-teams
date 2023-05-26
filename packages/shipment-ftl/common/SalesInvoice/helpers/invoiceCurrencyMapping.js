import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';

const getCountryCode = (id) => {
	const details = getCountryDetails({ country_id: id	});

	return details.country_code;
};

const INVOICE_CURRENCY_MAPPINGS = {
	freight_invoice_currency: {
		[getCountryCode(GLOBAL_CONSTANTS.country_ids.IN)]: [
			GLOBAL_CONSTANTS.currency_code.INR,
			GLOBAL_CONSTANTS.currency_code.USD,
		],
		[getCountryCode(GLOBAL_CONSTANTS.country_ids.GB)]: [
			GLOBAL_CONSTANTS.currency_code.GBP,
			GLOBAL_CONSTANTS.currency_code.EUR,
			GLOBAL_CONSTANTS.currency_code.USD,
		],
		[getCountryCode(GLOBAL_CONSTANTS.country_ids.VN)]: [
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.VND,
		],
		others: [
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.EUR,
			GLOBAL_CONSTANTS.currency_code.INR,
		],
	},
};

export default INVOICE_CURRENCY_MAPPINGS;
