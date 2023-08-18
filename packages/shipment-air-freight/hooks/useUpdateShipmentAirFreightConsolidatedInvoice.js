import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';

const useUpdateShipmentAirFreightConsolidatedInvoice = ({
	refetch = () => {}, onCancel = () => {}, task_id,
	invoiceData = [],
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_air_freight_consolidated_invoice',
		method : 'POST',
	}, { manual: true });

	const {
		apiTrigger = () => {},
		loading:updateLoading = false,
	} = 		useUpdateShipmentPendingTask({ refetch, onCancel });

	const updateShipmentAirFreightConsolidatedInvoice = async () => {
		try {
			await trigger({
				params: {
					status : 'finance_approved',
					id     : invoiceData[GLOBAL_CONSTANTS.zeroth_index],
				},
			});
			apiTrigger(task_id);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		updateShipmentAirFreightConsolidatedInvoice,
		updateLoading,

	};
};
export default useUpdateShipmentAirFreightConsolidatedInvoice;
