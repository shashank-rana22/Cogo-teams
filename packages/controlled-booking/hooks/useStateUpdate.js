import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getPayload = ({ state, formValues }) => {
	if (state === 'rejected') {
		return {
			booking_status     : 'rejected',
			explanation        : formValues?.rejection_reason,
			explanation_checks : formValues?.rejection_category,
		};
	}
	if (state === 'approved') {
		return {
			booking_status       : 'approved',
			// explanation          : formValues?.rejection_reason,
			explanation_checks   : [formValues?.booking_placed_on],
			advance_payment_info : {
				is_required     : formValues?.advance_payment === 'required',
				amount          : formValues?.advance_payment === 'required' ? formValues?.amount : undefined,
				amount_currency : formValues?.advance_payment === 'required' ? formValues?.amount_currency : undefined,
			},
		};
	}
};

const useStateUpdate = ({ id, refetchBookingList, setShowModal }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_checkout_approval',
		method : 'post',
	}, { manual: true });

	const updateState = useCallback(async ({ state, formValues }) => {
		const payload = getPayload({ state, formValues });
		try {
			await	trigger({
				data: {
					id,
					...payload,

				},
			});
			setShowModal(false);
			refetchBookingList();
			Toast.success(`${state} successfully`);
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	}, [id, refetchBookingList, setShowModal, trigger]);

	return {
		loading,
		updateState,
	};
};

export default useStateUpdate;
