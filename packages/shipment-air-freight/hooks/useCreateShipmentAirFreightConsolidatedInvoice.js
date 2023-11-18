import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import getPayload from '../page-components/Tasks/TaskExecution/utils/format-payload-consolidated-invoice';

const useCreateShipmentAirFreightConsolidatedInvoice = ({
	type = 'terminal', index = 0, sheetData = {}, mainServicesData = {},
	entityData = {}, setTerminalChargeState = () => {},
	collectionPartyData = {}, setInvoiceData = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/create_shipment_air_freight_consolidated_invoice',
		method : 'POST',
	}, { manual: true });

	const createShipmentAirFreightConsolidatedInvoice = async (values) => {
		const additionalServicePayload = getPayload({
			type,
			values,
			mainServicesData,
			sheetData,
			entityData,
			collectionPartyData,
		});

		try {
			const res = await trigger({
				data: additionalServicePayload,
			});
			setInvoiceData(res?.data);
			setTerminalChargeState((prev) => ({ ...prev, [index]: 'irn_generate' }));
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
