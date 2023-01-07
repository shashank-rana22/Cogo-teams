import { useRouter } from '@cogoport/next';
import { request } from '@cogoport/request/helpers/request';
import { useDispatch, useSelector } from '@cogoport/store';
import { setGeneralState } from '@cogoport/store/reducers/general';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const UNAUTHENTICATED_PATHS = [
	'/login',
	'/signup',
	'/forgot-password',
	'/reset-password/[id]',
	'/verify-email/[id]',
	'/accept-invite/[id]',
	'/verify-auto-sign-up-email/[id]',
];

function SessionCheck({ children }) {
	const {
		pathname, query, locale, locales, route, push,
	} = useRouter();
	const { _initialized, ...profile } = useSelector((s) => s.profile);

	const isUnauthenticatedPath = UNAUTHENTICATED_PATHS.includes(route);
	const isProfilePresent = Object.keys(profile).length !== 0;

	const dispatch = useDispatch();

	const [sessionInitialized, setSessionInitialized] = useState(false);

	dispatch(setGeneralState({
		pathname, query, locale, locales,
	}));

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
					await push('/home');
				} else if (!isProfilePresent && (!isUnauthenticatedPath || route === '/')) {
					await push('/login');
				}
				setSessionInitialized(true);
			}
		})();
	}, [_initialized, isProfilePresent, isUnauthenticatedPath, sessionInitialized]);

	if (!sessionInitialized) {
		return (
			<div className={styles.container}>
				<img
					alt="cogoport-loading"
					src="https://cdn.cogoport.io/cms-prod/vault/original/cogoport-loading.gif"
				/>
			</div>
		);
	}

	return children;
}

export default SessionCheck;
