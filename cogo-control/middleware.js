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

		if (!request.nextUrl.pathname.includes('/v2/')) {
			const language = acceptLanguage.get(request.headers.get('accept-language'))
				|| process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
			const locale = request.cookies.get(process.env.NEXT_PUBLIC_LOCALE_KEY)?.value || language;
			const url = request.nextUrl.clone();
			const newUrl = url.pathname.replace(`/${locale}`, '');
			const urlObj = new URL(newUrl, request.url);
			return NextResponse.redirect(urlObj);
		}

		if (request.nextUrl.locale === 'default' && request.nextUrl.pathname.includes('/v2/')) {
			const language = acceptLanguage.get(request.headers.get('accept-language'))
				|| process.env.NEXT_PUBLIC_DEFAULT_LOCALE;

			const locale = request.cookies.get(process.env.NEXT_PUBLIC_LOCALE_KEY)?.value || language;

			const url = `/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`;

			const urlObj = new URL(url, request.url);

			// eslint-disable-next-line consistent-return
			return NextResponse.redirect(urlObj);
		}

		if (request.headers.has('referer')) {
			const refererUrl = new URL(request.headers.get('referer'));

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
