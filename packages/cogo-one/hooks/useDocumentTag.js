import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const ZERO = 0;

const useDocumentTag = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_shipment_document_notification',
		method : 'post',
	}, { manual: true });

	const postDocumentTag = async ({ payload, setOpenModal = () => {} }) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Success');
			setOpenModal(false);
		} catch (e) {
			Toast.error(e?.response?.data?.shipment_pending_task[ZERO] || 'something went wrong');
		}
	};
	return {
		postDocumentTag,
		loading,
	};
};
export default useDocumentTag;
