import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useUpdateShipmentBackdateStatus() {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_backdate_validation_status',
		method : 'POST',
	}, { manual: true });

	const udpateShipment = async (payload, callback = () => {}) => {
		try {
			await trigger({
				data: payload,
			});
			callback();
			Toast.success('Request successful');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		updatingShipment: loading,
		udpateShipment,
	};
}

export default useUpdateShipmentBackdateStatus;
