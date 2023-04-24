import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useMemo } from 'react';

const useGetUserRequestedFaqs = () => {
	const profile = useSelector((state) => state.profile);

	const { id = '' } = profile?.user || {};

	const params = useMemo(() => ({
		filters: {
			status: 'active',
		},
		user_id: id,
	}), [id]);

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_user_requested_faqs',
		params,
	}, { manual: true });

	const getUserFaqs = useCallback(async () => {
		try {
			await trigger({ params });
		} catch (e) {
			if (e.response?.data) { Toast.error(getApiErrorString(e.response?.data)); }
		}
	}, [params, trigger]);

	const { requested_questions: list } = data || {};

	return {
		list,
		getUserFaqs,
		loading,
	};
};

export default useGetUserRequestedFaqs;
