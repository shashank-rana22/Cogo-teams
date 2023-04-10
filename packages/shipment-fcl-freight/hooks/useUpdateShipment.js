import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

import toastApiError from '../utils/toastApiError';

export default function useUpdateShipment({ successCallbacks = [], successMsg = '' }) {
	const { refetch } = useContext(ShipmentDetailContext);

	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment',
		method : 'POST',
	}, { manual: true });

	const updateShipment = async ({ payload }) => {
		try {
			await trigger({ data: payload });
			successCallbacks?.forEach((cb) => cb?.());
			refetch();

			if (successMsg) {
				Toast.success(successMsg);
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		updateShipment,
		loading,
	};
}
