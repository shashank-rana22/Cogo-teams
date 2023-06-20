import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useDocumentTag = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_shipment_document_notification',
		method : 'post',
	}, { manual: true });

	const postDocumentTag = async ({ payload = {}, setOpenModal = () => {} }) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Document Tag Successful');
			setOpenModal(false);
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data));
		}
	};
	return {
		postDocumentTag,
		loading,
	};
};
export default useDocumentTag;
