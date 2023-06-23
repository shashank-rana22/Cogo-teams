import { getCookie, getByKey } from '@cogoport/utils';

import getGeoConstants from '../constants/geo';
import GLOBAL_CONSTANTS from '../constants/globals';

const geo = getGeoConstants();

const LOCALE_CURRENCY_ABBR_MAPPING = {
	'en-IN': {
		T: 'K',
	},
	'vi-VN': {
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

const formatCurrency = ({ amount, locale, options }) => {
	if (!(locale in LOCALE_CURRENCY_ABBR_MAPPING) || !(options?.notation === 'compact')) {
		return amount;
	}

	let formattedAmount = amount;

	const splittedAmount = formattedAmount.split(GLOBAL_CONSTANTS.regex_patterns.white_space);

	Object.entries(LOCALE_CURRENCY_ABBR_MAPPING[locale]).forEach(([current, newVal]) => {
		if (amount.includes('T') && locale === 'en-IN') {
			formattedAmount = amount.replace(current, newVal);
		}

		if (splittedAmount.includes(current)) {
			formattedAmount = amount.replace(current, newVal);
		}
	});

	return formattedAmount;
};

const format = ({ locale, amount, options, currency }) => {
	const formattedAmount = new Intl.NumberFormat(locale, {
		minimumFractionDigits: 0,
		...options,
		...('style' in options && {
			currency: options.currency || currency,
		}),
	}).format(Number(amount));

	return formatCurrency({ amount: formattedAmount, locale, options });
};

/**
 *  @typedef {Object}             [arguments]
 *  @property {String|Number}     [amount]
 *  @property {String}            [currency]
 *  @property {Object}            [options]
 */
const formatAmount = ({ amount = '', currency = '', options = {} }) => {
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
