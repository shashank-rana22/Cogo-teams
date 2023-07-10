import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { request } from '@cogoport/request';
import { useDispatch, useSelector } from '@cogoport/store';
import { setGeneralState } from '@cogoport/store/reducers/general';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty, setCookie } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import redirections from '../utils/redirections';

const UNAUTHENTICATED_PATHS = [
	'/login',
	'/signup',
	'/forgot-password',
	'/reset-password/[id]',
	'/verify-email/[id]',
	'/accept-invite/[id]',
	'/verify-auto-sign-up-email/[id]',
];

const REDIRECT_PATHS = [
	'/[partner_id]/ticket-management/my-tickets',
];

const SECOND_QUERY_ELEMENT = 1;

const useGetAuthorizationChecked = ({ firestoreToken }) => {
	const {
		pathname, query, locale, locales, route, push, asPath,
	} = useRouter();

	const { _initialized, ...profile } = useSelector((s) => s.profile);

	const dispatch = useDispatch();
	const [sessionInitialized, setSessionInitialized] = useState(false);

	const { source = '' } = query || {};

	const isUnauthenticatedPath = UNAUTHENTICATED_PATHS.includes(route);
	const isProfilePresent = !isEmpty(Object.keys(profile));

	dispatch(setGeneralState({ pathname, query, locale, locales, firestoreToken }));

	useEffect(() => {
		(async () => {
			if (!_initialized) {
				try {
					const res = await request.get('get_user_session');

					const { partner = {} } = res.data || {};
					setCookie('parent_entity_id', partner.id);

					if (REDIRECT_PATHS.includes(pathname)) {
						const newPath = pathname.replace(GLOBAL_CONSTANTS.regex_patterns.dynamic_bracket, '');
						const queryPath = asPath.split('?')?.[SECOND_QUERY_ELEMENT];
						const redirectPath = `${newPath}?${queryPath}`;

						setCookie('redirect_path', redirectPath);
					}

					dispatch(setProfileState({ _initialized: true, ...res.data }));
				} catch (err) {
					console.error(err);
				}
			}
		})();
	}, [_initialized, asPath, dispatch, pathname]);

	useEffect(() => {
		(async () => {
			if (!sessionInitialized && _initialized) {
				if (isProfilePresent && (isUnauthenticatedPath || route === '/') && source !== 'add_account') {
					const configs = redirections(profile);
					if (configs?.href) {
						if (configs?.href?.includes('/v2')) {
							const replaceHref = configs?.href?.replace('/v2', '');
							const replaceAs = configs?.as?.replace('/v2', '');
							await push(replaceHref, replaceAs);
						} else if (!configs?.href?.includes('/v2') && process.env.NODE_ENV === 'production') {
							// eslint-disable-next-line no-undef
							window.location.href = `/${profile?.partner?.id}${configs.as || configs.href}`;
						} else {
							await push('/', '/');
						}
					}
				} else if (!isProfilePresent && (!isUnauthenticatedPath || route === '/')) {
					await push('/login');
				}
				setSessionInitialized(true);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [_initialized, isProfilePresent, isUnauthenticatedPath, sessionInitialized]);

	return { sessionInitialized, setSessionInitialized };
};

export default useGetAuthorizationChecked;
