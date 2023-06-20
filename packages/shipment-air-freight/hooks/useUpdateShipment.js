import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

export default function useUpdateShipment({
	refetch = () => {},
	successMessage = 'Shipment updated successfully!',
}) {
	const { refetch: shipmentRefetch } = useContext(ShipmentDetailContext);

	const [{ loading }, trigger] = useRequest({
		url          : '/update_shipment',
		method       : 'POST',
		service_name : 'shipment',
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
