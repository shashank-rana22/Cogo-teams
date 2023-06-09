import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateCancelShipment = ({
	cancellationReason,
	cancellationSubReason, shipmentData, setShowCancelModal,
}) => {
	const [{ loading }, triggger] = useRequest({
		url    : '/update_shipment',
		method : 'POST',
	}, { manual: true });

	const cancelShipment = async () => {
		try {
			await triggger({
				data: {
					cancellation_reason    : cancellationReason,
					cancellation_subreason : cancellationSubReason,
					id                     : shipmentData?.id,
					state                  : 'cancelled',
				},
			});
			Toast.success('Shipment closed successfully');
			setShowCancelModal(false);
		} catch (err) {
			// console.log(err);
		}
	};
	return { cancelShipment, loading };
};
export default useUpdateCancelShipment;
