import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

function useCreateEmployeeDocument() {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/create_employee_document',
		method : 'POST',
	}, { manual: true });

	const createEmployeeDocument = async ({ data }) => {
		try {
			await trigger({
				data: {
					employee_detail_id : data?.id,
					document_type      : data?.document_type,
					document_url       : data?.document_url,
					status             : data?.status || 'active',
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
