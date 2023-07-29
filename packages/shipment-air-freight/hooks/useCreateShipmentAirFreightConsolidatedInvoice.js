import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import getPayload from '../page-components/Tasks/TaskExecution/utils/format-payload-consolidated-invoice';

import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';

const useCreateShipmentAirFreightConsolidatedInvoice = ({
	sheetData = {}, mainServicesData = {},
	entityData = {}, refetch = () => {}, onCancel = () => {}, task_id,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_air_freight_consolidated_invoice',
		method : 'POST',
	}, { manual: true });

	const {
		apiTrigger = () => {},
		loading:updateLoading = false,
	} = 		useUpdateShipmentPendingTask({ refetch, onCancel });

	const createShipmentAirFreightConsolidatedInvoice = async (values) => {
		const additionalServicePayload = getPayload({
			values,
			mainServicesData,
			sheetData,
			entityData,
		});

		try {
			await trigger({
				data: additionalServicePayload,
			});
			apiTrigger({ id: task_id });
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		createShipmentAirFreightConsolidatedInvoice,
		updateLoading,

	};
};
export default useCreateShipmentAirFreightConsolidatedInvoice;
