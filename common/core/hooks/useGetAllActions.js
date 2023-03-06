/* eslint-disable no-undef */

import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { getCookie, setCookie } from '@cogoport/utils';

const useGetAllActions = ({
	user = {},
	refetch = () => {},
	profile = '',
	setOpenPopover = () => {},
}) => {
	const {
		profile: profileData = {},
	} = useSelector((state) => state);

	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);
	const cogo_admin_auth_token = getCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME);

	const [{ loading: switchUserSessionLoading }] = useRequest({
		url    : '/switch_user_session',
		method : 'get',
	}, { manual: true });

	const [{ loading: updateParentAndChildSessionLoading }, updateParentAndChildSessionTrigger] = useRequest({
		url    : '/update_parent_and_child_user_session_mappings',
		method : 'post',
	}, { manual: true });

	const api = profile === 'default' ? '/delete_user_session' : '/remove_user_sessions';

	const [{ loading: deleteUserSessionsLoading }, trigger] = useRequest({
		url    : api,
		method : 'delete',
	}, { manual: true });

	const removeProfile = async () => {
		try {
			let payload = {
				active_token     : token,
				parent_token     : cogo_admin_auth_token,
				tokens_to_remove : [user?.user_session_id],
			};

			if (profile === 'default') {
				payload = {
					token,
				};
			}

			const res = await trigger({
				params: {
					...payload,
				},
			});

			if (!res.hasError) {
				const random_uid = (profileData?.user_session_mappings || []).filter(
					(item) => {
						if (item?.user_id !== user?.user_id) {
							return item;
						}

						return null;
					},
				);

				const response = await updateParentAndChildSessionTrigger({
					params: {
						active_user_session_id:
							profile === 'default' ? token : random_uid?.[0]?.user_session_id,
						parent_user_session_id: cogo_admin_auth_token || undefined,
					},
				});

				if (!response.hasError) {
					if (
						profile === 'default'
						&& profileData?.user_session_mappings?.length > 1
					) {
						setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, response?.data?.parent_token);
						setCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME, response?.data?.parent_token);
						window.location.href = '/';
						Toast.success('User logged out successfully! Redirecting...');
					}

					if (
						profile === 'default'
						&& profileData?.user_session_mappings?.length === 1
					) {
						setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, 'expired', -1);
						setCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME, 'expired', -1);
						window.location.href = '/v2/login';
						Toast.success(
							'User logged out successfully! Redirecting to Login Page',
						);
					}

					if (
						profile === 'non-default'
						&& profileData?.user_session_mappings?.length > 1
					) {
						setCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME, response?.data?.parent_token);
						refetch();
						Toast.success('User logged out successfully!');
					}

					setOpenPopover(false);
				}
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	return {
		removeProfile,
		deleteLoading : deleteUserSessionsLoading,
		switchLoading : switchUserSessionLoading,
		updateLoading : updateParentAndChildSessionLoading,
	};
};

export default useGetAllActions;
