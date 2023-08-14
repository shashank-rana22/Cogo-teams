import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

const getPayload = ({ documentIds = [], shipmentId = '', isAlreadySent = false }) => ({
	shipment_id  : shipmentId,
	document_ids : documentIds,
	send_again   : isAlreadySent,
});

const useSendBookingNoteOnWhatsapp = (
	{ onClose = () => {} },
) => {
	const [alreadySentData, setAlreadySentData] = useState([]);

	const [{ loading }, trigger] = useRequest({
		url    : '/send_booking_note_on_whatsapp',
		method : 'post',
	}, { manual: true });

	const isAlreadySent = !isEmpty(alreadySentData);

	const triggerBookingNote = async ({ documentIds, shipmentId }) => {
		try {
			const res = await trigger({ data: getPayload({ documentIds, shipmentId, isAlreadySent }) });
			const { data = {} } = res || {};
			const { not_sent = false, booking_note_ids = [] } = data || {};

			if (not_sent) {
				setAlreadySentData(booking_note_ids);
				return;
			}

			Toast.success('Sent Sucessfully');
			setAlreadySentData([]);
			onClose();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'something went wrong');
		}
	};

	return {
		triggerBookingNote,
		bnLoading: loading,
		alreadySentData,
	};
};
export default useSendBookingNoteOnWhatsapp;
