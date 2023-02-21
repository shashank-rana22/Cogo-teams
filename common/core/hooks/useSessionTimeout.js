/* eslint-disable no-undef */
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { getCookie, setCookie } from '@cogoport/utils';

const useSessionTimeout = ({
	user = {},
	refetch = () => {},
}) => {
	const profile_name = user?.user_data?.name?.split(' ');

	const [{ loading = false }, trigger] = useRequest({
		url    : '/update_parent_and_child_user_session_mappings',
		method : 'post',
	}, { manual: true });

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
			// eslint-disable-next-line no-console
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
