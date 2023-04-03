import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

function useGetTest() {
	const [{ loading, data = {} }, trigger] = useRequest({
		method : 'get',
		url    : '/get_test',
	}, { manual: true });

	const getTest = useCallback(({ test_id }) => {
		try {
			trigger({
				params: {
					id: test_id,
				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	}, [trigger]);

	return {
		loading,
		data,
		getTest,
	};
}

export default useGetTest;
