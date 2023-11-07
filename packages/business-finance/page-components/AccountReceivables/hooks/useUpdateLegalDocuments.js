import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateLegalDocuments = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/themis/upload_legal_documents_to_sharepoint',
		method : 'post',
	}, { manual: true });

	const updateLegalDocuments = async (registrationNumber) => {
		try {
			await trigger({
				data: {
					registration_number: registrationNumber,
				},
			});

			Toast.success('Documents Saved');
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};

	return {
		updateLegalDocuments,
		loading,
	};
};

export default useUpdateLegalDocuments;
