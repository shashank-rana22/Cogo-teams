import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import languageMapping from '@cogoport/globalization/constants/languageLocaleMapping';
import acceptLanguage from 'accept-language';

import generateRedirectionUrl from './helpers/generateRedirectionUrl';
import { i18n } from './next-i18next.config';

const PUBLIC_FILE = /\.(.*)$/;
const LOCALE_COOKIE_KEY = 'locale';

const LANG_PREFERENCE_COOKIE_KEY = 'lang_preference';

const COOKIE_EXPIRY = 12;

const languages = i18n.locales.filter((locale) => locale !== 'default');

const LANGUAGE_LOCALE_MAPPING = Object.keys(languageMapping).reduce((acc, key) => {
	acc[languageMapping[key].value] = key;
	return acc;
}, {});

acceptLanguage.languages(languages);

const getCookie = ({ request }) => {
	const cookieLocale = request.cookies.get(LOCALE_COOKIE_KEY)?.value;

	const cookieLangPreference = request.cookies.get(LANG_PREFERENCE_COOKIE_KEY)?.value;

	return { cookieLocale, cookieLangPreference };
};

const oldLocale = {
	isPresent({ pathname }) {
		return languages.some((locale) => pathname.split('/').includes(locale));
	},
};

const getLocale = ({
	language,
	cookieLocale,
	cookieLangPreference,
}) => {
	let locale = 'default';

	if (cookieLocale && languages.includes(cookieLocale)) {
		locale = cookieLocale;
	}

	if (cookieLangPreference in LANGUAGE_LOCALE_MAPPING) {
		locale = LANGUAGE_LOCALE_MAPPING[cookieLangPreference];
	}

	if (locale === 'default' && languages.includes(language)) {
		locale = language;
	}

	return locale;
};

export const middleware = async (request) => {
	try {
		if (
			PUBLIC_FILE.test(request.nextUrl.pathname)
			|| request.nextUrl.pathname.startsWith('/_next')
			|| request.nextUrl.pathname.includes('/api/')
		) {
			return;
		}

		const isOldLocalePresent = oldLocale.isPresent({
			pathname: request.nextUrl.pathname,
		});

		const language = acceptLanguage.get(request.headers.get('accept-language'));

		const { cookieLocale, cookieLangPreference } = getCookie({ request });

		const locale = getLocale({
			language,
			cookieLocale,
			cookieLangPreference,
		});

		const langPreference = cookieLangPreference || GLOBAL_CONSTANTS.default_preferred_language;

		const response = generateRedirectionUrl({
			request,
			locale,
			isOldLocalePresent,
		});

		const cokkieExpiry = new Date();

		cokkieExpiry.setHours(cokkieExpiry.getHours() + COOKIE_EXPIRY);

		response.cookies.set(LOCALE_COOKIE_KEY, locale);

		if (!cookieLangPreference) {
			response.cookies.set(LANG_PREFERENCE_COOKIE_KEY, langPreference);
		}

		// eslint-disable-next-line consistent-return
		return response;
	} catch (error) {
		console.error('error :: ', error);
	}
};
