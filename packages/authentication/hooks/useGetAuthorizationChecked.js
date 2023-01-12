import { useRouter } from '@cogoport/next';
import { request } from '@cogoport/request';
import { useDispatch, useSelector } from '@cogoport/store';
import { setGeneralState } from '@cogoport/store/reducers/general';
import { setProfileState } from '@cogoport/store/reducers/profile';
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

const useGetAuthorizationChecked = () => {
	const [sessionInitialized, setSessionInitialized] = useState(false);
	const dispatch = useDispatch();

	const { pathname, query, locale, locales, route, push } = useRouter();

	const { _initialized, ...profile } = useSelector((s) => s.profile);

	const isUnauthenticatedPath = UNAUTHENTICATED_PATHS.includes(route);
	const isProfilePresent = Object.keys(profile).length !== 0;

	dispatch(setGeneralState({ pathname, query, locale, locales }));

	useEffect(() => {
		(async () => {
			if (!_initialized) {
				const res = await request.get('get_user_session');
				dispatch(setProfileState({ _initialized: true, ...res.data }));
			}
		})();
	}, [dispatch]);

	useEffect(() => {
		(async () => {
			if (!sessionInitialized && _initialized) {
				if (isProfilePresent && (isUnauthenticatedPath || route === '/')) {
					const configs = redirections(profile);
					if (configs?.href) {
						if (configs?.href?.includes('v1')) {
							window.location.href = `/v1/${profile?.partner?.id}${configs.href.replace('/v1', '')}`;
						} else {
							await push(configs?.href);
						}
					}
				} else if (!isProfilePresent && (!isUnauthenticatedPath || route === '/')) {
					await push('/login');
				}
				setSessionInitialized(true);
			}
		})();
	}, [_initialized, isProfilePresent, isUnauthenticatedPath, sessionInitialized]);

	return { sessionInitialized, setSessionInitialized };
};

export default useGetAuthorizationChecked;
