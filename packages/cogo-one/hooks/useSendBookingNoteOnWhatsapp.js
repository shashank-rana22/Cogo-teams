import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ documentIds = [], shipmentId }) => ({
	shipment_id  : shipmentId,
	document_ids : documentIds,
	send_again   : false,
});

const useSendBookingNoteOnWhatsapp = (
	{ onClose = () => {} },
) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_booking_note_on_whatsapp',
		method : 'post',
	}, { manual: true });

	const triggerBookingNote = async ({ documentIds, shipmentId }) => {
		try {
			await trigger({ data: getPayload({ documentIds, shipmentId }) });
			Toast.success('Sent Sucessfully');
			onClose();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'something went wrong');
		}
	};

	return {
		triggerBookingNote,
		bnLoading: loading,
	};
};
export default useSendBookingNoteOnWhatsapp;
