import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

export default function useUpdateBookingNote({
	refetch = () => {},
	successMessage = 'Booking Confirmation Document Updated Successfully',
}) {
	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/update_booking_document',
		method : 'POST',
	}, { manual: true });

	const updateBookingNote = useCallback(async (payload) => {
		try {
			await trigger({ data: payload });

			refetch();
			Toast.success(successMessage);
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, refetch, successMessage]);

	return {
		loading,
		updateBookingNote,
	};
}
