/* eslint-disable no-undef */
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { getCookie, setCookie } from '@cogoport/utils';

const useSessionTimeout = ({
	user = {},
	refetch = () => {},
}) => {
	const {
		profile = {},
	} = useSelector((state) => state || {});
	const profile_name = user?.user_data?.name?.split(' ');

	const [{ loading = false }, trigger] = useRequest({
		url    : '/update_parent_and_child_user_session_mappings',
		method : 'post',
	}, { manual: true });

	const [{ loading: deleteLoading }, deleteUserSessionsTrigger] = useRequest({
		url    : '/delete_user_session',
		method : 'delete',
	}, { manual: true });

	const logout = async () => {
		try {
			const cogo_admin_auth_token = getCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME);
			const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);
			const payload = {
				token,
			};

			const response = await deleteUserSessionsTrigger({ params: payload });

			if (!response.hasError) {
				const update_response = await trigger({
					params: {
						active_user_session_id : token,
						parent_user_session_id : cogo_admin_auth_token,
					},
				});

				if (!update_response.hasError) {
					if (
						update_response?.data?.parent_token
						&& profile?.user_session_mappings?.length !== 1
					) {
						setCookie(
							'cogo-admin-auth-token',
							update_response?.data?.parent_token,
						);
						setCookie('cogo-admin-token', update_response?.data?.parent_token);
						window.location.href = '/';
					}

					if (
						profile?.user_session_mappings?.length === 1
						|| !update_response?.data?.parent_token
					) {
						setCookie('cogo-admin-auth-token', 'expired', -1);
						setCookie('cogo-admin-token', 'expired', -1);
						window.location.href = '/login';
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const sessionExpired = async () => {
		try {
			// const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);
			const cogo_admin_auth_token = getCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME);

			const payload = {
				active_user_session_id : user?.user_session_id,
				parent_user_session_id : cogo_admin_auth_token || undefined,
			};

			const res = await trigger({
				params: payload,
			});

			if (!res.hasError) {
				setCookie('cogo-admin-auth-token', res?.data?.parent_token);
				Toast.error(`Session for ${user?.user_data?.name} has expired`);
				refetch();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return {
		loading,
		deleteLoading,
		profile_name,
		sessionExpired,
	};
};

export default useSessionTimeout;
