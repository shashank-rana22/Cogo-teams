import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import getCreateBookingDocumentPayload from '../helpers/getCreateBookingDocumentPayload';
import toastApiError from '../utils/toastApiError';

export default function useCreateBookingNote({
	closeModal,
	refetchList,
}) {
	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/create_booking_document',
		method : 'POST',
	}, { manual: true });

	const createBookingNote = useCallback(async (formData) => {
		try {
			await trigger({
				data: getCreateBookingDocumentPayload(formData),
			});

			refetchList();
			closeModal();
			Toast.succes('Booking Confirmation Document Created Successfully');
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, closeModal, refetchList]);

	return {
		loading,
		createBookingNote,
	};
}
