import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetRfqGraph = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_rfq_graph',
		method : 'GET',
	}, { manual: true });

	const getRfqGraph = useCallback(({ rfq_id = '' }) => {
		try {
			trigger({
				params: {
					rfq_id,
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [trigger]);

	return {
		getRfqGraph,
		data,
		loading,
	};
};

export default useGetRfqGraph;
