import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

function useCreateEmployeeDocument({ component }) {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/create_employee_document',
		method : 'POST',
	}, { manual: true });

	const createEmployeeDocument = async ({ data, id }) => {
		try {
			await trigger({
				data: {
					employee_detail_id : id,
					document_type      : component,
					document_url       : data[component]?.finalUrl,
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
		createEmployeeDocument,
	};
}

export default useCreateEmployeeDocument;
