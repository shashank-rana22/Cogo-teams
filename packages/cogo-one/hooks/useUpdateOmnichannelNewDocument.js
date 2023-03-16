import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useUpdateOmnichannelNewDocument({
	documentsList = () => {}, singleItem = {}, setSingleItem = () => {},
	setShowModal = () => {},
	type = '',
	fileType = '',

}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_omnichannel_document_details',
		method : 'post',
	}, { manual: true });

	const updateNewDocument = async ({ data = {}, documentCount = () => {}, listIds = [] }) => {
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

			if (type === 'update_count') {
				documentCount();
			} else {
				documentsList();
				Toast.success('Successfully Uploaded');
				setShowModal(false);
				setSingleItem({});
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		updateNewDocument,
		loading,
	};
}

export default useUpdateOmnichannelNewDocument;
