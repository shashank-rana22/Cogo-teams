import { useRequest } from '@cogoport/request';
import { signInWithCustomToken } from 'firebase/auth';
import { useCallback } from 'react';

const getParams = ({ userEmailAddress }) => ({
	email: userEmailAddress,
});

const useFetchFirebaseCustomToken = () => {
	const [, trigger] = useRequest({
		url    : '/get_firestore_custom_token',
		method : 'get',
	});

	const fetchFirebaseCustomToken = useCallback(async ({ auth, userEmailAddress }) => {
		try {
			const res = await trigger({ params: getParams({ userEmailAddress }) });

			signInWithCustomToken(auth, res.data.custom_token);
		} catch (err) {
			console.error('err', err);
		}
	}, [trigger]);

	return {
		fetchFirebaseCustomToken,
	};
};

export default useFetchFirebaseCustomToken;
