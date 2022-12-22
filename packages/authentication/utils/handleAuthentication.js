import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty, getByKey as getValue } from '@cogoport/utils';
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

const NOT_KYC_VERIFIED_ALLOWED_PATHS_NOT_IN_NAVIGATION = [
	'/demo',
	'/faqs',
	'/menu',
	'/profile',
	'/submit-kyc',
];

const AUTH_TOKEN_NAME = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;

const handleAuthentication = async ({
	asPath,
	store,
	isServer,
	res,
	req,
	pathname,
	query,
}) => {
	const asPrefix = '';

	// if ((asPath || '').includes('_next') || (asPath || '').includes('sw.js')) {
	// 	return { asPrefix };
	// }
	//
	// if (['/'].includes(asPath) || ['/'].includes(pathname)) {
	// 	return { asPrefix };
	// }

	const isUnauthenticatedPath =		UNAUTHENTICATED_PATHS.includes(asPath)
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
		req,
	});

	if (isEmpty(userData)) {
		if (!isServer) {
			try {
				deleteCookie(AUTH_TOKEN_NAME, { req, res });
			} catch (e) {
				console.log(e);
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

	const { partner_id: channelPartnerId } = query;

	const { partners: channelPartners = [], permissions_navigations } = userData;

	const channelPartner =		channelPartners.find((channelPartnerItem) => channelPartnerItem.id === channelPartnerId)
		|| channelPartners[0]
		|| {};

	if (isEmpty(channelPartner)) {
		if (asPath.includes('/get-started')) {
			return { asPrefix };
		}

		redirect({ isServer, res, path: '/get-started' });
		return { asPrefix };
	}

	const account_types = ['importer_exporter'];

	await store.dispatch(
		setProfileState({
			partner: {
				...{},
				account_types,
			},
			permissions_navigations : {},
			authorizationparameters : null,
		}),
	);

	// asPrefix = `/${activeChannelPartner.id}`;

	const activeChannelPartner = {};

	const { verifications } = activeChannelPartner;
	const kycStatus = getValue(verifications, '[0].kyc_status');
	const isKycVerified = kycStatus === 'verified';

	const defaultRoute = `${asPrefix}${DEFAULT_PATHS.AUTHENTICATED || '/'}`;

	if (
		pathname.includes('/[partner_id]/get-started')
		|| asPath.includes(DEFAULT_PATHS.NOT_VERIFIED_KYC)
	) {
		redirect({ isServer, res, path: defaultRoute });
		return { asPrefix };
	}

	if (!asPath.startsWith(asPrefix) || pathname.includes('_error')) {
		redirect({ isServer, res, path: defaultRoute });
	}

	return { asPrefix };
};

export default handleAuthentication;
