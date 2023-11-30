import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import { useCallback } from 'react';

import { FIREBASE_CONFIG } from '../constants';

const getParams = ({ userEmailAddress }) => ({
	email: userEmailAddress,
});

const useAuthenticateFirebase = () => {
	const [, trigger] = useRequest({
		url    : '/get_firestore_custom_token',
		method : 'get',
	});

	const app = isEmpty(getApps()) ? initializeApp(FIREBASE_CONFIG) : getApp();

	const fetchFirebaseCustomToken = useCallback(
		async ({ auth, userEmailAddress }) => {
			try {
				const res = await trigger({ params: getParams({ userEmailAddress }) });

				await signInWithCustomToken(auth, res.data.custom_token);
			} catch (err) {
				console.error('firebase_custom_token', err);
			}
		},
		[trigger],
	);

	const signInFirebase = useCallback(
		async ({ customToken, userEmailAddress }) => {
			if (process.env.NEXT_PUBLIC_REST_BASE_API_URL.includes('api.cogoport.com')) {
				const auth = await getAuth(app);

				if (isEmpty(auth?.currentUser)) {
					await signInWithCustomToken(auth, customToken).catch(
						async (error) => {
							console.error('firebase_sign_in_error', error.message);

							await fetchFirebaseCustomToken({ auth, userEmailAddress });
						},
					);
				}
			}
		},
		[app, fetchFirebaseCustomToken],
	);

	return {
		signInFirebase,
	};
};

export default useAuthenticateFirebase;
