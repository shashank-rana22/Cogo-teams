import { isEmpty } from '@cogoport/utils';
import { getCookie } from 'cookies-next';

import getUserData from './getUserData';
import redirect from './redirect';

const UNAUTHENTICATED_PATHS = [
	'/login',
	'/signup',
	'/forgot-password',
];

const DEFAULT_PATHS = {
	AUTHENTICATED   : '/dashboard',
	UNAUTHENTICATED : '/login',
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

	const isUnauthenticatedPath = UNAUTHENTICATED_PATHS.includes(asPath)
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

	const { partner = {} } = await getUserData({
		store,
		isServer,
		pathname,
		req,
	});

	if (isEmpty(partner)) {
		redirect({ isServer, res, path: '/login' });
		return { asPrefix };
	}

	if (asPath === '/' && partner && partner.id) {
		asPrefix = `/${partner.id}/home`;
		redirect({ isServer, res, path: asPrefix });
		return { asPrefix };
	}

	return { asPrefix };
};

export default handleAuthentication;
