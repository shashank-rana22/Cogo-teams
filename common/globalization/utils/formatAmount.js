import { getCookie, getByKey } from '@cogoport/utils';

import getGeoConstants from '../constants/geo';
import GLOBAL_CONSTANTS from '../constants/globals';

const geo = getGeoConstants();

const currencyMapping = {
	VND: {
		Tr : 'M',
		T  : 'B',
	},
};

const isAmountValid = ({ amount }) => !(
	amount === null
		|| Array.isArray(amount)
		|| typeof amount === 'boolean'
		// eslint-disable-next-line no-restricted-globals
		|| isNaN(amount)
);

const getCurrencyLocale = ({ currency }) => {
	let scope;
	try {
		scope = getCookie('scope');
	} catch (error) {
		console.log(error);
	}

	const geoCurrencyLocale = getByKey(geo, `formats.amount.scope[${scope}].locale`);
	if (geoCurrencyLocale) {
		return geoCurrencyLocale;
	}

	let tempCurrency = geo.country.currency.code;
	if (currency in GLOBAL_CONSTANTS.currency_locale) {
		tempCurrency = currency;
	}

	return GLOBAL_CONSTANTS.currency_locale[tempCurrency];
};

const formatCurrency = ({ amount, currency, options }) => {
	if (!(currency in currencyMapping) || !(options?.notation === 'compact' && options?.compactDisplay === 'short')) {
		return amount;
	}

	let formattedAmount = amount;
	const splittedAmount = formattedAmount.split(/\s+/);

	Object.entries(currencyMapping[currency]).forEach(([current, newVal]) => {
		if (splittedAmount.includes(current)) {
			formattedAmount = amount.replace(current, newVal);
		}
	});

	return formattedAmount;
};

const format = ({ locale, amount, options, currency }) => {
	const formatted = new Intl.NumberFormat(locale, {
		minimumFractionDigits: 0,
		...options,
		...('style' in options && {
			currency: options.currency || currency,
		}),
	}).format(Number(amount));

	return formatCurrency({ amount: formatted, currency, options });
};

/**
 *  @typedef {Object}             [arguments]
 *  @property {String|Number}     [amount]
 *  @property {String}            [currency]
 *  @property {Object}            [options]
 */
const formatAmount = ({ amount = '', currency, options = {} }) => {
	if (!isAmountValid({ amount })) {
		return null;
	}

	const UPPERCASE_CURRENCY = (
		currency || geo.country.currency.code
	).toUpperCase();

	return format({
		locale   : getCurrencyLocale({ currency: UPPERCASE_CURRENCY }),
		amount,
		options,
		currency : UPPERCASE_CURRENCY,
	});
};

export default formatAmount;
