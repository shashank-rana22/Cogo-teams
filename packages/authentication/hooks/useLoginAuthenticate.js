import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import useRequest from '@cogoport/request/hooks/useRequest';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { setCookie } from '@cogoport/utils';
import { useEffect } from 'react';

import redirections from '../utils/redirections';

const useLoginAuthenticate = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { _initialized, ...profile } = useSelector((s) => s.profile);

	const [{ loading: loginLoading }, trigger] = useRequest({
		url    : '/login_user',
		method : 'post',
	}, { manual: true });

	const [{ loading: sessionLoading }, triggerSession] = useRequest({
		url    : '/get_user_session',
		method : 'get',
	}, { manual: true });

	useEffect(() => {
		if (Object.keys(profile).length > 0) {
			const configs = redirections(profile);
			if (configs?.href) {
				if (configs?.href?.includes('v1')) {
					window.location.href = `/v1/${profile?.partner?.id}${configs.href.replace('/v1', '')}`;
				} else {
					router.push(configs?.href);
				}
			}
		}
	}, [profile, router]);

	const onSubmit = async (values, e) => {
		e.preventDefault();
		try {
			const response = await trigger({
				data: {
					...values,
					auth_scope : 'partner',
					platform   : 'admin',
				},
			});
			const { token } = response.data || {};
			setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token);
			setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME_2, token);
			const res = await triggerSession();
			dispatch(setProfileState(res.data));
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to login, please try again...');
		}
	};

	return { onSubmit, loading: loginLoading || sessionLoading };
};

export default useLoginAuthenticate;
