import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { getCookie, setCookie } from '@cogoport/utils';

const useRemoveUserSessions = () => {
	const {
		profile = {},
	} = useSelector((state) => state || {});

	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);

	const cogo_admin_auth_token = getCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME);

	const [{ loading = false }, trigger] = useRequest({
		url    : '/remove_user_sessions',
		method : 'delete',
	}, { manual: true });

	const logoutOfAllAccounts = async () => {
		try {
			const all_user_ids = [];

			(profile?.user_session_mappings || []).forEach((user) => {
				if (user?.user_session_id) {
					all_user_ids.push(user?.user_session_id);
				}
				return null;
			});

			const payload = {
				active_token     : token,
				parent_token     : cogo_admin_auth_token,
				tokens_to_remove : all_user_ids,
			};

			const res = await trigger({ params: payload });

			if (!res.hasError) {
				setCookie('cogo-admin-token', 'expired', -1);
				setCookie('cogo-admin-auth-token', 'expired', -1);
				Toast.success('Logged out of all accounts');
				// eslint-disable-next-line no-undef
				window.location.href = '/v2/login';
			}
		} catch (error) {
			Toast.error('Unable to log out of all accounts');
		}
	};
	return { logoutOfAllAccounts, loading };
};

export default useRemoveUserSessions;
