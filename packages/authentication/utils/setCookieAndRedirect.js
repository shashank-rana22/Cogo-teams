import { setCookie } from '@cogoport/utils';

const setCookieAndRedirect = (token, ctx) => {
	const { res, isServer } = ctx || {};
	setCookie('cogo-partner-token', token, 2000, ctx);

	if (isServer) {
		res.redirect('/');
	} else {
		window.location.href = '/';
	}
};

export default setCookieAndRedirect;
