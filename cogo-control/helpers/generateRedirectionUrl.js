import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import acceptLanguage from 'accept-language';
import { NextResponse } from 'next/server';

import { i18n } from '../next-i18next.config';

const languages = i18n.locales.filter((locale) => locale !== 'default');

acceptLanguage.languages(languages);

const removeLocales = ({ pathname, locales }) => pathname
	.split('/')
	.filter((splittedPathname) => !locales.includes(splittedPathname))
	.join('/');

const oldLocale = {
	languages: languages.map((lang) => lang.split('-')[GLOBAL_CONSTANTS.zeroth_index]), // ['en', 'vi', ...]
	isPresent({ pathname }) {
		return this.languages.some((locale) => pathname.split('/').includes(locale));
	},
};

const generateRedirectionUrl = ({ request, locale, isOldLocalePresent }) => {
	const url = request.nextUrl.clone();

	let { pathname } = url;

	pathname = removeLocales({ pathname, locales: languages });
	if (isOldLocalePresent) {
		pathname = removeLocales({ pathname, locales: oldLocale.languages });
	}
	url.pathname = pathname;

	const targetUrl = `${url.origin}/v2/${locale}${
		pathname === '/' ? '' : pathname
	}${url.search}`;

	if (request.url === targetUrl) {
		return NextResponse.next();
	}

	if (request.method === 'HEAD') {
		return NextResponse.error();
	}

	return NextResponse.redirect(
		`${url.origin}/v2/${locale}${pathname === '/' ? '' : pathname}${url.search}`,
	);
};

export default generateRedirectionUrl;
