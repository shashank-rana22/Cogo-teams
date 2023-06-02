import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useBulkUpdateRfqState = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_update_rfq_state',
		method : 'POST',
	}, { manual: true });

	const bulkUpdateRfqState = async ({ payload, getRfqsForApproval }) => {
		try {
			await trigger({
				data: {
					rfq_ids : payload,
					state   : 'approved',
				},
			});

			await getRfqsForApproval();
			Toast.success('Approved the RFQS');
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
