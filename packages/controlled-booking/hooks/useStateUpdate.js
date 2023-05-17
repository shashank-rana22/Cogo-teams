import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useStateUpdate = ({ id, refetchBookingList, setShowModal }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_controlled_checkout_state',
		method : 'post',
	}, { manual: true });

	const updateState = useCallback(({ state, rejection_reason }) => {
		try {
			trigger({
				data: {
					id,
					state,
					rejection_reason: state === 'rejected' ? rejection_reason : undefined,
				},
			});
			setShowModal(false);
			refetchBookingList();
		} catch (err) {
			console.log(err, 'erro');
		}
	}, [id, refetchBookingList, setShowModal, trigger]);

	return {
		loading,
		updateState,
	};
};

export default useStateUpdate;
