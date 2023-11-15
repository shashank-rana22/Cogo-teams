import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUploadFinanceDocuments = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/upload_payroll_finance_documents',
	}, { manual: true });

	const uploadDocument = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Details updated successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, uploadDocument };
};

export default useUploadFinanceDocuments;
