import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdateRfqState = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_rfq_state',
		method : 'POST',
	}, { manual: true });

	const updateRfqState = useCallback(async ({ rfq_id = '', setShow }) => {
		try {
			await trigger({
				data: {
					rfq_id,
					state: 'approved',
				},
			});

			Toast.success('Approved the RFQ');
			setShow(false);
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [trigger]);

	return {
		updateRfqState,
		loading,
	};
};

export default useUpdateRfqState;
