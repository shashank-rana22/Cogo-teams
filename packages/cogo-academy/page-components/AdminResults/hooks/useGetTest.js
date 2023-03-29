import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetTest({ id }) {
	const [{ loading = false, data = {} }, trigger] = useRequest({
		method : 'get',
		url    : 'get_test',
	}, { manual: false });

	const getTest = useCallback(({ test_id }) => {
		try {
			trigger({
				params: {
					id: test_id,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [trigger]);

	useEffect(() => {
		getTest({ test_id: id });
	}, [getTest, id]);

	return {
		loading,
		data,
		getTest,
	};
}

export default useGetTest;
