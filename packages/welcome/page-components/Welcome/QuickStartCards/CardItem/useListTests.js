import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const PAGE_LIMIT = 1;

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

	const ListTests = useCallback(() => {
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

	useEffect(() => { ListTests(); }, [ListTests]);

	return {
		total_count,
	};
};

export default useTestsList;
