import acceptLanguage from 'accept-language';
import { NextResponse } from 'next/server';

import { i18n } from './next-i18next.config';

const PUBLIC_FILE = /\.(.*)$/;

const languages = i18n.locales.filter((locale) => locale !== 'default');

acceptLanguage.languages(languages);

export const middleware = async (request) => {
	try {
		if (
			PUBLIC_FILE.test(request.nextUrl.pathname)
			|| request.nextUrl.pathname.startsWith('/_next')
			|| request.nextUrl.pathname.includes('/api/')
		) {
			return;
		}

		if (request.nextUrl.locale === 'default') {
			const language =				acceptLanguage.get(request.headers.get('accept-language'))
				|| process.env.NEXT_PUBLIC_DEFAULT_LOCALE;

			const locale =				request.cookies.get(process.env.NEXT_PUBLIC_LOCALE_KEY)?.value
				|| language;

			const url = `/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`;
			// eslint-disable-next-line compat/compat
			const urlObj = new URL(url, request.url);

			// eslint-disable-next-line consistent-return
			return NextResponse.redirect(urlObj);
		}

		if (request.headers.has('referer')) {
			const refererUrl = new URL(request.headers.get('referer'));
			// console.log('refererUrl :: ', refererUrl);

			const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
			const response = NextResponse.next();
			if (lngInReferer) {
				response.cookies.set(process.env.NEXT_PUBLIC_LOCALE_KEY, lngInReferer);
			}

			// eslint-disable-next-line consistent-return
			return response;
		}

		return;
	} catch (error) {
		console.log(error);
	}
};
