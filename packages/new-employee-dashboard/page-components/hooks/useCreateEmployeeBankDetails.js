import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

function useCreateEmployeeBankDetails({ bank_details, getEmployeeDetails }) {
	const api = isEmpty(bank_details) ? '/create_employee_bank_details' : '/update_employee_bank_details';

	const { id: bankDetailId = '' } = bank_details?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const [{ loading }, trigger] = useHarbourRequest({
		url    : api,
		method : 'POST',
	}, { manual: true });

	const createEmployeeBankDetails = async ({ values, id }) => {
		try {
			await trigger({
				data: {
					...values,
					id                  : bankDetailId || undefined,
					cancelled_check_url : values?.cancelled_check_url?.finalUrl || values?.cancelled_check_url,
					status              : values?.status || 'active',
					employee_detail_id  : id,
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
