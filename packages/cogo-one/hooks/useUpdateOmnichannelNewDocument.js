import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useUpdateOmnichannelNewDocument({ documentsList = () => {}, singleItem = {}, setSingleItem = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_omnichannel_document',
		method : 'post',
	}, { manual: true });

	const updatelNewDocument = async ({ data }) => {
		const {
			utility_bill_document_url = '', country_id = '', preferred_languages = [],
			registration_number = '',
		} = data || {};
		const {
			document_type = '',
			document_url = '',
		} = singleItem || {};

		try {
			await trigger({
				data: {
					media_url        : document_url,
					document_data    : { country_id, preferred_languages, registration_number },
					update_media_url : utility_bill_document_url,
					state            : 'document_uploaded',
					document_type,
				},
			});
			documentsList();
			setSingleItem({});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		updatelNewDocument,
		loading,
	};
}

export default useUpdateOmnichannelNewDocument;
