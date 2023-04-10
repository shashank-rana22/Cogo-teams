import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useContext, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useUpdateShipment = ({ setShow = () => {} }) => {
	const { refetch } = useContext(ShipmentDetailContext);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment',
		method : 'POST',
	});

	const updateShipment = useCallback(async ({ payload }) => {
		try {
			await trigger({ params: payload });
			Toast.success('Cancellation Requested');
			setShow(false);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, refetch, setShow]);

	return {
		updateShipmentLoading: loading,
		updateShipment,
	};
};

export default useUpdateShipment;
