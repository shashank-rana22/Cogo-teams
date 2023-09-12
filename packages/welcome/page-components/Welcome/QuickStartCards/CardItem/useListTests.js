import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const PAGE_LIMIT = 10;

const useTestsList = () => {
	const {
		user: { id: user_id },
	} = useSelector(({ profile }) => ({
		user: profile.user,
	}));

	const [{ data = {} }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_tests',
	}, { manual: true });

	const { total_count } = data || {};

	useEffect(() => {
		try {
			trigger({
				params: {
					page_limit : PAGE_LIMIT,
					filters    : {
						user_id,
						status: ['active', 'draft', 'published', 'retest'],
					},
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.message?.data));
		}
	}, [trigger, user_id]);

	return {
		total_count,
	};
};

export default useTestsList;
