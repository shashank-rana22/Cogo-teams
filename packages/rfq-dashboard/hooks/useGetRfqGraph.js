import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const usegetRfqGraph = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_rfq_graph',
		method : 'GET',
	}, { manual: true });

	const getRfqGraph = useCallback(async ({ rfq_id = '' }) => {
		try {
			const response = await trigger({
				params: {
					rfq_id,
				},
			});
			console.log('response', response);
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

export default usegetRfqGraph;
