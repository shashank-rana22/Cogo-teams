import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateBankDetails = ({ id, getEmployeeDetails }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/update_employee_bank_details',
		method : 'POST',
	}, { manual: true });

	const updateBankDetails = async ({ status }) => {
		try {
			await trigger({
				data: {
					status,
					id: id || undefined,
				},
			});

			getEmployeeDetails();
		} catch (err) {
			if (err?.response) {
				Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
			}
		}
	};

	return {
		loading,
		updateBankDetails,
	};
};

export default useUpdateBankDetails;
