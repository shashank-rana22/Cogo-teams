import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useCreatePayroll = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_payroll',
	}, { manual: true });

	const createPayroll = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		createPayroll,
		data,
	};
};

export default useCreatePayroll;
