import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import useRequest from '@cogoport/request/hooks/useRequest';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { getCookie, setCookie } from '@cogoport/utils';
import { useEffect } from 'react';

import redirections from '../utils/redirections';

const useLoginAuthenticate = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { _initialized, ...profile } = useSelector((s) => s.profile);
	const {
		general: { query = {} },
	} = useSelector((state) => state);
	const { source = '' } = query || {};

	const cogo_parent_auth_token = getCookie('cogo-parent-auth-token');

	const [{ loading: loginLoading }, trigger] = useRequest({
		url    : '/login_user',
		method : 'post',
	}, { manual: true });

	const [{ loading: sessionLoading }, triggerSession] = useRequest({
		url    : '/get_user_session',
		method : 'get',
	}, { manual: true });

	const [{ loading: userSessionMappingLoading }, triggerUserSessionMapping] = useRequest({
		url    : '/get_user_session_mappings',
		method : 'get',
	}, { manual: false });

	const [{ loading: updateSessionMappingLoading }, triggerUpdateSessionMapping] = useRequest({
		url    : '/update_parent_and_child_user_session_mappings',
		method : 'post',
	}, { manual: false });

	// const getUserSessionMappings = async () => {
	// 	try {
	// 		const sessionData = await triggerUserSessionMapping({
	// 			params: { parent_user_session_id: cogo_parent_auth_token },
	// 		});
	// 		if (!sessionData.hasError) {
	// 			if (sessionData?.data?.list?.length === 0) {
	// 				setCookie('cogo-parent-auth-token', 'expired', -1);
	// 				setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, 'expired', -1);
	// 			}
	// 			return;
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// useEffect(() => {
	// 	if (source !== 'add_account') {
	// 		getUserSessionMappings();
	// 	}
	// });

	useEffect(() => {
		if (Object.keys(profile).length > 0) {
			const configs = redirections(profile);
			if (configs?.href?.includes('/v2')) {
				const replaceHref = configs?.href?.replace('/v2', '');
				const replaceAs = configs?.as?.replace('/v2', '');
				router.push(replaceHref?.href, replaceAs?.as);
			}
			if (!configs?.href?.includes('/v2') && process.env.NODE_ENV === 'production') {
				// eslint-disable-next-line no-undef
				window.location.href = `/${profile?.partner?.id}${configs.href}`;
			} else {
				router.push(configs.href, configs.as);
			}
		}
	}, [profile, router]);

	const onSubmit = async (values, e) => {
		e.preventDefault();
		try {
			let check_duplicate_email = false;
			let user_data = {};

			if (cogo_parent_auth_token) {
				const mapping_response = await triggerUserSessionMapping({
					params: { parent_user_session_id: cogo_parent_auth_token },
				});

				if (!mapping_response.hasError) {
					(mapping_response?.data?.list || []).forEach((user) => {
						if (values?.email === user?.user_data?.email) {
							user_data = {
								...user,
								user_active: true,
							};
						}

						return null;
					});

					check_duplicate_email = user_data?.user_active || false;
				}
			}

			if (check_duplicate_email) {
				if (source !== 'add_account') {
					const { user_session_id = '' } = user_data || {};
					setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, user_session_id);
					// eslint-disable-next-line no-undef
					window.location.reload();
				}

				if (source === 'add_account') {
					Toast.error('Cannot login with already active account');
				}

				return;
			}

			const response = await trigger({
				data: {
					...values,
					auth_scope : 'partner',
					platform   : 'admin',
				},
			});
			const { token } = response.data || {};

			const payload = {
				active_user_session_id : token,
				parent_user_session_id : cogo_parent_auth_token || undefined,
			};

			const updateSession = await triggerUpdateSessionMapping({
				data: payload,
			});

			const { parent_token } = (updateSession || {}).data || {};

			setCookie('cogo-parent-auth-token', parent_token);
			setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token);

			const res = await triggerSession();
			dispatch(setProfileState(res.data));
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to login, please try again...');
		}
	};

	return {
		onSubmit,
		loading: loginLoading || sessionLoading || updateSessionMappingLoading || userSessionMappingLoading,
	};
};

export default useLoginAuthenticate;
