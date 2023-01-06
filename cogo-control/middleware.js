import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
	if (
		req.nextUrl.pathname.startsWith('/_next')
		|| req.nextUrl.pathname.includes('/api/')
		|| PUBLIC_FILE.test(req.nextUrl.pathname)
	) {
		return;
	}

	console.log({ aa: req.nextUrl });

	if (req.nextUrl.locale === 'default') {
		const cookieLocale = req.cookies.get('NEXT_LOCALE');

		let locale = 'en-IN';

		if (cookieLocale) {
			locale = cookieLocale;
		}

		const url = new URL(
			`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
			req.url,
		);

		return NextResponse.redirect(url);
	}
}
