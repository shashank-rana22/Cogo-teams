import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateNextPayroll = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_next_payroll',
	}, { manual: true });

	const updatePayroll = async ({ payload }) => {
		try {
			await trigger({
				data: {
					data_array: payload,
				},
			});
			Toast.success('Successfully updated Payroll');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updatePayroll,
	};
};

export default useUpdateNextPayroll;
