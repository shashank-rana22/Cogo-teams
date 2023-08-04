import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';

function useCreateShipmentAirCSRSheet({
	setTerminalChargeState = () => {},
	mainServicesData = {},
	setSheetData = () => {},
}) {
	const geo = getGeoConstants();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_air_csr_sheet',
		method : 'POST',
	}, { manual: true });

	const createShipmentAirCSRSheet = async (values) => {
		const { csr_reference_number = '', terminal_charge_document = {} } = values || {};

		try {
			const response =	await trigger({
				data: {
					service_provider_id : geo.uuid.freight_force_org_id,
					csr_type            : 'terminal_charge_invoice',
					csr_reference_number,
					uploaded_file_url   : terminal_charge_document?.finalUrl || terminal_charge_document,
					airline_id          : mainServicesData?.airline_id,
				},
			});
			setSheetData({
				...response?.data,
			});
			setTerminalChargeState('fetching_data');
		} catch (err) {
			toastApiError(err);
		}
	};

	return {

		csrCreateLoading: loading,
		createShipmentAirCSRSheet,
	};
}
export default useCreateShipmentAirCSRSheet;
