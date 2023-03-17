import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const EmptyFunction = () => {};
const EmptyObject = {};

function useUpdateOmnichannelNewDocument({
	documentsList = EmptyFunction,
	singleItem = EmptyObject,
	setSingleItem = EmptyFunction,
	setShowModal = EmptyFunction,
	setSelectedDocumentType = EmptyFunction,
	type = '',
	fileType = '',

}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_omnichannel_document_details',
		method : 'post',
	}, { manual: true });

	const updateNewDocument = useCallback(async ({ data = {}, listIds = [] }) => {
		const {
			country_id = '', preferred_languages = [],
			registration_number = '',
		} = data || {};

		const {
			document_url = '',
		} = singleItem || {};

		const updateCountPayload = {
			ids     : listIds,
			is_seen : true,
		};

		const updateFilePayload = {
			media_url     : document_url,
			document_data : fileType === 'pan' ? { registration_number }
				: { country_id, preferred_languages, registration_number },
			state         : 'document_uploaded',
			document_type : fileType,
		};

		const finalPayload = type === 'update_count' ? updateCountPayload : updateFilePayload;

		try {
			await trigger({
				data: finalPayload,
			});

			if (type !== 'update_count') {
				documentsList();
				Toast.success('Successfully Uploaded');
				setShowModal(false);
				setSingleItem({});
				setSelectedDocumentType('');
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	}, [documentsList, fileType, setSelectedDocumentType, setShowModal, setSingleItem, singleItem, trigger, type]);

	return {
		updateNewDocument,
		loading,
	};
}

export default useUpdateOmnichannelNewDocument;
