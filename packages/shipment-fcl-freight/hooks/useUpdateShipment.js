import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

export default function useUpdateShipment({
	refetch = () => {},
	successMessage = 'Shipment updated successfully!',
}) {
	const { refetch: shipmentRefetch } = useContext(ShipmentDetailContext);

	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment',
		method : 'POST',
	}, { manual: true });

	const updateShipment = async (payload) => {
		try {
			await trigger({ data: payload });

			refetch();

			shipmentRefetch();

			Toast.success(successMessage);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		updateShipment,
		loading,
	};
}
