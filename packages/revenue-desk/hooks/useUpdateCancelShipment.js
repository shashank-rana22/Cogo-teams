import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateCancelShipment = ({
	cancellationReason, setShowDetailPage,
	cancellationSubReason, shipmentData, setshowCancelModal,
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
			setshowCancelModal(false);
			setShowDetailPage(null);
		} catch (err) {
			Toast.error('Something went wrong');
			setshowCancelModal(false);
		}
	};
	return { cancelShipment, loading };
};
export default useUpdateCancelShipment;
