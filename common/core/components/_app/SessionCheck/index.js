import { useRouter } from '@cogoport/next';
import { request } from '@cogoport/request/helpers/request';
import { useDispatch, useSelector } from '@cogoport/store';
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
	const router = useRouter();
	const { _initialized, ...profile } = useSelector((s) => s.profile);

	const isUnauthenticatedPath = UNAUTHENTICATED_PATHS.includes(router.route);
	const isProfilePresent = Object.keys(profile).length !== 0;

	const dispatch = useDispatch();

	const [sessionInitialized, setSessionInitialized] = useState(false);

	useEffect(() => {
		(async () => {
			const res = await request.get('get_user_session');
			dispatch(setProfileState({ _initialized: true, ...res.data }));
		})();
	}, [dispatch]);

	useEffect(() => {
		(async () => {
			if (!sessionInitialized && _initialized) {
				if (isProfilePresent && (isUnauthenticatedPath || router.route === '/')) {
					await router.push('/home');
				} else if (!isProfilePresent && (!isUnauthenticatedPath || router.route === '/')) {
					await router.push('/login');
				}
				setSessionInitialized(true);
			}
		})();
	}, [_initialized, isProfilePresent, isUnauthenticatedPath, router, sessionInitialized]);

	if (!sessionInitialized) {
		return <div className={styles.container}>Initializing Session ...</div>;
	}

	return children;
}

export default SessionCheck;
