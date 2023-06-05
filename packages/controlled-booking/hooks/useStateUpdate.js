import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getPayload = ({ state, formValues }) => {
	const payloadMap = {
		rejected: {
			booking_status     : 'rejected',
			explanation        : formValues?.rejection_reason,
			explanation_checks : formValues?.rejection_category,
		},
		approved: {
			booking_status       : 'approved',
			explanation_checks   : formValues?.booking_placed_on,
			advance_payment_info : {
				is_required     : formValues?.advance_payment === 'required',
				amount          : formValues?.advance_payment === 'required' ? Number(formValues?.amount) : undefined,
				amount_currency : formValues?.advance_payment === 'required' ? formValues?.amount_currency : undefined,
			},
		},
	};

	return payloadMap[state] || null;
};

const useStateUpdate = ({ id, refetchBookingList, setModalType, modalType }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_checkout_approval',
		method : 'post',
	}, { manual: true });

	const updateState = useCallback(async (formValues) => {
		const payload = getPayload({ state: modalType, formValues });
		try {
			await	trigger({
				data: {
					id,
					...payload,

				},
			});
			setModalType(false);
			refetchBookingList();
			Toast.success(`${modalType} successfully`);
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	}, [id, refetchBookingList, setModalType, modalType, trigger]);

	return {
		loading,
		updateState,
	};
};

export default useStateUpdate;
