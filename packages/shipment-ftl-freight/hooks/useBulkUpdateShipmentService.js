import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useBulkUpdateShipmentService = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_update_shipment_services',
		method : 'POST',
	}, { manual: true });

	const updateShipmentService = async (payload) => {
		try {
			const res = await trigger({ data: payload });
			return res;
		} catch (error) {
			toastApiError(error);
		}
		return null;
	};
	return {
		updateShipmentService,
		loading,
	};
};
export default useBulkUpdateShipmentService;
