import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useSendShipmentDocumentationNotification = ({ setTagModal = () => {}, reset, getDocumentsList = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_shipment_document_notification',
		method : 'post',
	}, { manual: true });

	const postDocumentTag = async ({ payload = {}, setDocumentTagUrl = () => {} }) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Document Tag Successful');
			setDocumentTagUrl(false);
			setTagModal(false);
			reset();
			getDocumentsList();
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data));
		}
	};
	return {
		postDocumentTag,
		loading,
	};
};
export default useSendShipmentDocumentationNotification;
