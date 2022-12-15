import { CogoToast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getApiErrorString from '../../utils/getApiError';
import setCookieAndRedirect from '../../utils/setCookieAndRedirect';

const useLoginAuthenticate = () => {
	const [{ loading, error }, trigger] = useRequest({
		url    : '/login_user',
		method : 'post',
	}, { manual: true });

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
			console.log(err);
			CogoToast.error(getApiErrorString(error?.response?.data));
		}
	};

	return { onSubmit, loading };
};

export default useLoginAuthenticate;
