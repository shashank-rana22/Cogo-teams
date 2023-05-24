import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

function useCreateEmployeeDetails({ id }) {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/create_employee_detail',
		method : 'POST',
	}, { manual: false });

	const createEmployeeDetails = async ({ data }) => {
		try {
			await trigger({
				data: {
					employee_detail_id : id,
					document_url       : data?.document_url,
					status             : data?.status || 'active',
					performed_by_id    : '5674cb',
					performed_by_type  : '2314fb',

				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};
	return {
		loading,
		createEmployeeDetails,
	};
}

export default useCreateEmployeeDetails;
