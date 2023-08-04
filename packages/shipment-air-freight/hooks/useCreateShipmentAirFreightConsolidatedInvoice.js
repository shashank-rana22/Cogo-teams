import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import getPayload from '../page-components/Tasks/TaskExecution/utils/format-payload-consolidated-invoice';

const useCreateShipmentAirFreightConsolidatedInvoice = ({
	sheetData = {}, mainServicesData = {},
	entityData = {},
	createShipmentAdditionalService = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/create_shipment_air_freight_consolidated_invoice',
		method : 'POST',
	}, { manual: true });

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
			createShipmentAdditionalService();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		createShipmentAirFreightConsolidatedInvoice,
		data,

	};
};
export default useCreateShipmentAirFreightConsolidatedInvoice;
