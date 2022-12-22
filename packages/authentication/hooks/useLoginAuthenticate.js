import { Toast } from '@cogoport/components';
import useRequest from '@cogoport/request/hooks/useRequest';

import getApiErrorString from '../utils/getApiError';
import setCookieAndRedirect from '../utils/setCookieAndRedirect';

const useLoginAuthenticate = () => {
	const [{ loading, error }, trigger] = useRequest({
		url    : '/login_user',
		method : 'post',
	}, { manual: false });

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


			if (!response.hasError) {
				const { token } = (response || {}).data || {};
				setCookieAndRedirect(token, {});
			}
		} catch (err) {
			console.log('err', err);
			Toast.error(getApiErrorString(error?.response?.data) || 'Failed to login, please try again...');
		}
	};

	return { onSubmit, loading };
};

export default useLoginAuthenticate;
