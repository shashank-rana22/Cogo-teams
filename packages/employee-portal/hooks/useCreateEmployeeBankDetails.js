import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

function useCreateEmployeeBankDetails({ bank_details, getEmployeeDetails }) {
	const api = isEmpty(bank_details) ? '/create_employee_bank_details' : '/update_employee_bank_details';

	const { id :bankDetailId = '' } = bank_details?.[0] || {};

	const [{ loading }, trigger] = useHarbourRequest({
		url    : api,
		method : 'POST',
	}, { manual: true });

	const createEmployeeBankDetails = async ({ data, id }) => {
		try {
			await trigger({
				data: {
					id                  : bankDetailId || undefined,
					ifsc_code           : data?.ifsc_code,
					account_holder_name : data?.account_holder_name,
					bank_name           : data?.bank_name,
					bank_branch_name    : data?.branch_name,
					account_number      : data?.bank_account_number,
					cancelled_check_url : data?.cancelled_cheque?.finalUrl,
					status              : data?.status || 'active',
					employee_detail_id  : id,
					performed_by_id     : '85ab',
					performed_by_type   : '65cv',
				},
			});
			Toast.success('Bank Details have been saved successfully!');
			getEmployeeDetails();
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
