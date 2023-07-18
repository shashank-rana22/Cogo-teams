import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useUpdateEmployeeSignedDocument = () => {
	const [selectedFile, setSelectedFile] = useState('');
	const [showUploaderModal, setShowUploaderModal] = useState(null);

	const [{ btnloading }, trigger] = useHarbourRequest({
		url    : '/update_employee_signed_document',
		method : 'POST',
	}, { manual: true });

	const updateEmployeeSignedDocument = async () => {
		const payload = {
			id                  : showUploaderModal,
			signed_document_url : selectedFile,
		};

		try {
			await trigger({
				data: payload,
			});

			Toast.success('File uploaded successfully');
			setShowUploaderModal(null);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		btnloading,
		updateEmployeeSignedDocument,
		selectedFile,
		setSelectedFile,
		showUploaderModal,
		setShowUploaderModal,
	};
};

export default useUpdateEmployeeSignedDocument;
