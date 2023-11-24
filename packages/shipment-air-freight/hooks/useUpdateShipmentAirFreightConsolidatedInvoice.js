import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

const INCREMENT_BY_ONE = 1;

const useUpdateShipmentAirFreightConsolidatedInvoice = ({
	invoiceData = [], createShipmentAdditionalService = () => {}, index = 0,
	listLength = 0, terminalChargeState = {}, setTerminalChargeState = () => {},
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
			if (status === 'inactive') {
				const newObj = { ...terminalChargeState };
				delete newObj[index];
				const SHIFTED_OBJ = {};
				let newIndex = listLength;

				Object.keys(newObj).forEach((key) => {
					SHIFTED_OBJ[newIndex] = newObj[key];
					newIndex += INCREMENT_BY_ONE;
				});

				setTerminalChargeState(SHIFTED_OBJ);
			} else {
				createShipmentAdditionalService(values);
				setTerminalChargeState((prev) => ({ ...prev, [index]: 'irn_success' }));
			}
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
