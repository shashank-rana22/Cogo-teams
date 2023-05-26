import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateRfqState = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_rfq_state',
		method : 'POST',
	}, { manual: true });

	const updateRfqState = async ({ rfq_id = '', setShow }) => {
		try {
			const response = await trigger({
				data: {
					rfq_id,
					state: 'approved',
				},
			});

			if (response.status === 200) {
				Toast.success('Approved the RFQ');
				setShow(false);
			}
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		updateRfqState,
		loading,
	};
};

export default useUpdateRfqState;
