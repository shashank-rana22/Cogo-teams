import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useCreateEmployeeBankDetails() {
	const [{ loading }, trigger] = useRequest({
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
					branch_name         : data?.branch_name,
					bank_account_number : data?.bank_account_number,
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
