import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useBulkUpdateRfqState = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_update_rfq_state',
		method : 'POST',
	}, { manual: true });

	const bulkUpdateRfqState = async ({ payload }) => {
		try {
			await trigger({
				data: {
					rfq_ids : payload,
					state   : 'requested_for_approval',
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		bulkUpdateRfqState,
		loading,
	};
};

export default useBulkUpdateRfqState;
