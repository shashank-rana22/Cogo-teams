import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect } from 'react';

import { FIREBASE_CONFIG } from './LockScreen/configurations/firebase-config';
import useFetchFirebaseCustomToken from './useFetchFirebaseCustomToken';

function useFireBase({ user_data = {} }) {
	const {
		firestore_custom_token: token = '',
		email: userEmailAddress = '',
	} = user_data?.user || {};

	const app = isEmpty(getApps()) ? initializeApp(FIREBASE_CONFIG) : getApp();
	const firestore = getFirestore(app);

	const {
		fetchFirebaseCustomToken = () => {},
	} = useFetchFirebaseCustomToken();

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_REST_BASE_API_URL.includes('api.cogoport.com')) {
			const auth = getAuth();

			if (isEmpty(auth?.currentUser)) {
				signInWithCustomToken(auth, token).catch((error) => {
					console.error('firebase_sign_in_error', error.message);
					fetchFirebaseCustomToken({ auth, userEmailAddress });
				});
			}
		}
	}, [fetchFirebaseCustomToken, token, userEmailAddress]);

	return { firestore };
}

export default useFireBase;
