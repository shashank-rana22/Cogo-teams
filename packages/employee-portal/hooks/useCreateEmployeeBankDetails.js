import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

function useCreateEmployeeBankDetails() {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/create_employee_bank_details',
		method : 'POST',
	}, { manual: true });

	const createEmployeeBankDetails = async ({ data }) => {
		try {
			await trigger({
				data: {
					ifsc_code           : data?.ifsc_code,
					account_holder_name : data?.account_holder_name,
					bank_name           : data?.bank_name,
					bank_branch_name    : data?.branch_name,
					account_number      : data?.bank_account_number,
					cancelled_check_url : data?.cancelled_check_url,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};
	return {
		loading,
		createEmployeeBankDetails,
	};
}

export default useCreateEmployeeBankDetails;
