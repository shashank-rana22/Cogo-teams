import { NextResponse } from 'next/server';

// Regex to check whether something has an extension, e.g. .jpg
const PUBLIC_FILE = /\.(.*)$/;

// Next JS Middleware
export const middleware = (request) => {
	// Get the information we need from the request object
	const { nextUrl, cookies } = request;

	// Cloned url to work with
	const url = nextUrl.clone();

	try {
		// Early return if it is a public file such as an image
		if (PUBLIC_FILE.test(nextUrl.pathname)) {
			return undefined;
		}
		// Early return if this is an api route
		if (nextUrl.pathname.includes('/api')) {
			return undefined;
		}

		// Early return if we are on a locale other than default
		if (nextUrl.locale !== 'default') {
			return undefined;
		}

		let locale = 'en-IN';

		// Early return if there is a cookie present and on default locale
		if (nextUrl.locale === 'default') {
			const cookieLocale = cookies.NEXT_LOCALE;
			if (cookieLocale) {
				locale = cookieLocale;
			}
			url.pathname = `/${locale}${nextUrl.pathname}${nextUrl.search}`;
			return NextResponse.redirect(url);
		}

		// If everything else falls through continue on with response as normal
		return undefined;
	} catch (error) {
		console.log(error);
	}
};
