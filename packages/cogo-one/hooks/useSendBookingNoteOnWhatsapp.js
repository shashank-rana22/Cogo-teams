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
			await trigger({ data: getPayload({ documentIds, shipmentId, isAlreadySent }) });

			Toast.success('Sent Sucessfully');
			setAlreadySentData([]);
			onClose();
		} catch (error) {
			const { response } = error || {};
			const { data = {} } = response || {};
			const { booking_note_ids = [] } = data || {};

			if (isEmpty(booking_note_ids)) {
				Toast.error(getApiErrorString(error?.response?.data) || 'something went wrong');
				return;
			}
			setAlreadySentData(booking_note_ids?.flat() || []);
		}
	};

	return {
		triggerBookingNote,
		bnLoading: loading,
		alreadySentData,
	};
};
export default useSendBookingNoteOnWhatsapp;
