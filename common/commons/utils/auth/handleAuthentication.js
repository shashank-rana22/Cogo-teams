import { getCookieFromCtx } from '@cogoport/request/helpers/getCookieFromCtx';
import { getCookie } from 'cookies-next';

import redirect from '../redirect';

import getUserData from './getUserData';

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
	const asPrefix = '';

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

	if (UNAUTHENTICATED_PATHS.includes(asPath)) {
		redirect({ isServer, res, path: '/' });
		return { asPrefix };
	}
	// if (asPath === '/' && user_data?.partner && user_data?.partner?.id) {
	// 	asPrefix = `/${user_data?.partner?.id}`;
	// 	redirect({ isServer, res, path: asPrefix });
	// 	return { asPrefix };
	// }

	const userData = await getUserData({
		store,
		isServer,
		req,
	});

	return { asPrefix };
};

export default handleAuthentication;
