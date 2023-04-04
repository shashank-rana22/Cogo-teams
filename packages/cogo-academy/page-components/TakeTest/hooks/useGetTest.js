import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetTest({ id, user_id }) {
	const [{ loading = false, data = {} }, trigger] = useRequest({
		method : 'get',
		url    : '/get_test',
	}, { manual: false });

	const getTest = useCallback(({ test_id, userId }) => {
		try {
			trigger({
				params: {
					id      : test_id,
					user_id : userId,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [trigger]);

	useEffect(() => {
		getTest({ test_id: id, userId: user_id });
	}, [getTest, id, user_id]);

	return {
		loading,
		data,
	};
}

export default useGetTest;
