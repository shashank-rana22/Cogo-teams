import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentAirFreightConsolidatedInvoice = ({
	invoiceData = [], createShipmentAdditionalService = () => {}, index = 0, setTerminalChargeState = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_air_freight_consolidated_invoice',
		method : 'POST',
	}, { manual: true });

	const updateShipmentAirFreightConsolidatedInvoice = async ({ values = {}, status = '' }) => {
		try {
			await trigger({
				params: {
					status,
					id: invoiceData[GLOBAL_CONSTANTS.zeroth_index],
				},
			});
			createShipmentAdditionalService(values);
			setTerminalChargeState((prev) => ({ ...prev, [index]: 'irn_success' }));
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		updateShipmentAirFreightConsolidatedInvoice,
	};
};
export default useUpdateShipmentAirFreightConsolidatedInvoice;
