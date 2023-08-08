import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

function useCreateEmployeeDocument({ documents, getEmployeeDetails = () => {} }) {
	const url = isEmpty(documents) ? '/create_employee_document' : '/update_employee_document';

	const [{ loading }, trigger] = useHarbourRequest({
		url,
		method: 'POST',
	}, { manual: true });

	const createEmployeeDocument = async ({ id, newDoc }) => {
		const payload = {
			documents          : [...newDoc],
			employee_detail_id : id,
		};
		console.log(payload, 'payload');

		try {
			await trigger({
				data: payload,
			});
			getEmployeeDetails();
			Toast.success('Details and Documents have been saved successfully!');
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
