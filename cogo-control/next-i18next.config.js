const path = require('path');

const LANGUAGE_MAPPING = require('../common/globalization/constants/languageLocaleMapping');

module.exports = {
	i18n: {
		defaultLocale   : 'default',
		locales         : [...Object.keys(LANGUAGE_MAPPING), 'default'],
		localeDetection : false,
	},
	// eslint-disable-next-line valid-typeof
	...(typeof window === undefined
		? { localePath: path.resolve('./public/locales') }
		: {}),
};
