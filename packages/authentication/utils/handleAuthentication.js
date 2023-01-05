import { isEmpty } from '@cogoport/utils';
import { deleteCookie, getCookie } from 'cookies-next';

import getUserData from './getUserData';
import redirect from './redirect';

const UNAUTHENTICATED_PATHS = [
	'/login',
	'/signup',
	'/forgot-password',
	'/reset-password/[id]',
	'/verify-email/[id]',
	'/accept-invite/[id]',
	'/verify-auto-sign-up-email/[id]',
];

const DEFAULT_PATHS = {
	NOT_VERIFIED_KYC : '/submit-kyc',
	AUTHENTICATED    : '/dashboard',
	UNAUTHENTICATED  : '/login',

};

const AUTH_TOKEN_NAME = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;

const handleAuthentication = async ({
	asPath,
	store,
	isServer,
	res,
	req,
	pathname,
}) => {
	let asPrefix = '';

	const actualAsPath = asPath.split('?')[0];

	const isUnauthenticatedPath = UNAUTHENTICATED_PATHS.includes(actualAsPath)
		|| UNAUTHENTICATED_PATHS.includes(pathname);

	const token = getCookie(AUTH_TOKEN_NAME, isServer ? { req } : null);

	if (!token) {
		if (isUnauthenticatedPath) {
			return { asPrefix };
		}

		const path = `${DEFAULT_PATHS.UNAUTHENTICATED}?redirectPath=${asPath}`;
		redirect({ isServer, res, path });
		return { asPrefix };
	}

	const userData = await getUserData({
		store,
		isServer,
		pathname,
		req,
	});

	if (isEmpty(userData)) {
		if (!isServer) {
			try {
				deleteCookie(AUTH_TOKEN_NAME, { req, res });
			} catch (e) {
				// console.log(e);
			}
		}

		if (isUnauthenticatedPath) {
			return { asPrefix };
		}

		const path = `${DEFAULT_PATHS.UNAUTHENTICATED}?redirectPath=${asPath}`;

		redirect({ isServer, res, path });
		return { asPrefix };
	}

	if (asPath.startsWith('/get-started')) {
		return { asPrefix };
	}

	const { permissions_navigations } = userData;

	const partner_id = userData.partner.id;

	asPrefix = `/${partner_id || ''}`;
	const navigations = Object.keys(permissions_navigations || {});

	if (partner_id && [`/${partner_id}`, '/'].includes(asPath) && navigations.length > 0) {
		redirect({
			isServer,
			res,
			path: `${asPrefix}/home`,
		});

		return { asPrefix, query: { partner_id } };
	}

	const defaultRoute = `${asPrefix}/`;

	if (!asPath.startsWith(asPrefix)) {
		redirect({ isServer, res, path: defaultRoute });
	}

	return { asPrefix };
};

export default handleAuthentication;
