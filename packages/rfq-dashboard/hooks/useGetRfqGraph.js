import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const usegetRfqGraph = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_rfq_graph',
		method : 'GET',
	}, { manual: true });

	const getRfqGraph = async ({ rfq_id = '' }) => {
		try {
			const response = await trigger({
				data: {
					rfq_id,
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		getRfqGraph,
		data: graph_data,
		loading,
	};
};

export default usegetRfqGraph;
