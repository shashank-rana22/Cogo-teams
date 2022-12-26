import { setCookie } from '@cogoport/utils';

const setCookieAndRedirect = (token, ctx) => {
	const { res, isServer } = ctx || {};
	setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token, 2000, ctx);

	if (isServer) {
		res.redirect('/');
	} else {
		window.location.href = '/';
	}
};

export default setCookieAndRedirect;
